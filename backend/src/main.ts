import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import { join } from 'path';
import * as fs from 'fs';
import { AppModule } from './app.module';


// Trigger reload
async function bootstrap() {
  // Create Fastify adapter with Bun-compatible options
  const adapter = new FastifyAdapter({
    logger: false,
    trustProxy: true,
    bodyLimit: 10485760, // 10MB
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter as any,
  );

  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  // Register Fastify plugins
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  // CORS configuration - allow web and Wails desktop origins
  const isDev = configService.get<string>('NODE_ENV') !== 'production';
  const corsOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'https://localhost:3000',
    'https://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    // Wails desktop app origins
    'wails://wails.localhost:34115',
    'wails://wails.localhost',
    'wails.localhost',
    'https://wails.localhost',
    'wails://localhost',
    'app://wails',
    'wails://',
    'file://',
    null, // Allow file:// origins (desktop apps)
    configService.get<string>('FRONTEND_URL'),
  ].filter(Boolean);

  await app.register(cors, {
    origin: (origin: string | null, cb: (err: Error | null, allow: boolean) => void) => {
      // Allow requests with no origin (direct fetch) or specific local/wails origins
      if (!origin ||
        origin === 'null' ||
        origin.includes('localhost') ||
        origin.includes('127.0.0.1') ||
        origin.startsWith('wails://') ||
        origin.startsWith('app://')) {
        cb(null, true);
        return;
      }
      cb(null, true); // Fallback to true for maximum compatibility in desktop app
    },
    credentials: true,
  });

  // Register multipart only for multipart/form-data content type
  await app.register(multipart, {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
    attachFieldsToBody: false, // Don't interfere with JSON parsing
  });

  // Configure static file serving for frontend
  const frontendPath = join(process.cwd(), '../frontend/out');
  if (fs.existsSync(frontendPath)) {
    logger.log(`📱 Serving frontend UI from: ${frontendPath}`);
    await app.register(fastifyStatic, {
      root: frontendPath,
      prefix: '/',
      wildcard: true,
      index: ['index.html'],
    });
  } else {
    logger.warn(`⚠️  Frontend build not found at ${frontendPath}. Standalone UI will not be available.`);
  }

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // API prefix
  app.setGlobalPrefix('api/v1');

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('INAMSOS API')
    .setDescription('Indonesian National Cancer Database API')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('patients')
    .addTag('centers')
    .addTag('analytics')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get<number>('PORT') || 3001;

  await app.listen(port, '0.0.0.0');

  logger.log(`🚀 Application running on http://localhost:${port}`);
  logger.log(`📚 API documentation available at http://localhost:${port}/api/docs`);
  logger.log(`⚡ Powered by Fastify + Bun`);
}

bootstrap().catch((error) => {
  console.error('❌ Bootstrap failed:', error);
  process.exit(1);
});
