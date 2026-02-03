/**
 * Embedded server for desktop application
 * Runs NestJS backend locally with SQLite database
 */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

// Load environment variables
dotenv.config();

const logger = new Logger('EmbeddedServer');

/**
 * Find an available port starting from the given port
 */
async function findAvailablePort(startPort: number): Promise<number> {
  const net = await import('net');
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.listen(startPort, () => {
      server.once('close', () => {
        resolve(startPort);
      });
      server.close();
    });

    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        findAvailablePort(startPort + 1).then(resolve);
      } else {
        reject(err);
      }
    });
  });
}

/**
 * Start the embedded NestJS server
 */
export async function startEmbeddedServer() {
  const port = parseInt(process.env.PORT || '3001', 10);
  const host = process.env.HOST || '127.0.0.1';

  try {
    // Find available port
    const availablePort = await findAvailablePort(port);
    logger.log(`Starting embedded server on port ${availablePort}`);

    // Create Fastify app
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({
        logger: false, // Disable Fastify's logger, use NestJS logger
      }),
    );

    // Global prefix
    app.setGlobalPrefix('api/v1');

    // Validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    // Enable CORS for desktop
    app.enableCors({
      origin: ['app://', 'wails://', 'file://', 'http://localhost', 'capacitor://'],
      credentials: true,
    });

    // Versioning
    app.enableVersioning({
      type: VersioningType.URI,
    });

    // Start server
    await app.listen(availablePort, host);

    logger.log(`✅ Embedded server running at http://${host}:${availablePort}`);
    logger.log(`📊 API available at http://${host}:${availablePort}/api/v1`);
    logger.log(`🏥 Health check: http://${host}:${availablePort}/health`);

    // Write port to file for Wails to read
    const fs = await import('fs');
    const path = await import('path');
    const os = await import('os');

    const tempDir = os.tmpdir();
    const portFile = path.join(tempDir, 'inamsos-server-port');
    fs.writeFileSync(portFile, availablePort.toString());
    logger.log(`📝 Port written to: ${portFile}`);

    return {
      port: availablePort,
      app,
    };
  } catch (error) {
    logger.error('❌ Failed to start embedded server:', error);
    throw error;
  }
}

/**
 * For running standalone (not imported)
 */
if (require.main === module) {
  startEmbeddedServer()
    .then(() => {
      logger.log('✅ Server started successfully');
    })
    .catch((error) => {
      logger.error('❌ Failed to start server:', error);
      process.exit(1);
    });
}
