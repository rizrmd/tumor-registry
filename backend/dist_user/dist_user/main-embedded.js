"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startEmbeddedServer = startEmbeddedServer;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const dotenv = require("dotenv");
const app_module_1 = require("./app.module");
const common_2 = require("@nestjs/common");
dotenv.config();
const logger = new common_2.Logger('EmbeddedServer');
async function findAvailablePort(startPort) {
    const net = await Promise.resolve().then(() => require('net'));
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        server.listen(startPort, () => {
            server.once('close', () => {
                resolve(startPort);
            });
            server.close();
        });
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                findAvailablePort(startPort + 1).then(resolve);
            }
            else {
                reject(err);
            }
        });
    });
}
async function startEmbeddedServer() {
    const port = parseInt(process.env.PORT || '3001', 10);
    const host = process.env.HOST || '127.0.0.1';
    try {
        const availablePort = await findAvailablePort(port);
        logger.log(`Starting embedded server on port ${availablePort}`);
        const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter({
            logger: false,
        }));
        app.setGlobalPrefix('api/v1');
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }));
        app.enableCors({
            origin: ['app://', 'wails://', 'file://', 'http://localhost', 'capacitor://'],
            credentials: true,
        });
        app.enableVersioning({
            type: common_1.VersioningType.URI,
        });
        await app.listen(availablePort, host);
        logger.log(`✅ Embedded server running at http://${host}:${availablePort}`);
        logger.log(`📊 API available at http://${host}:${availablePort}/api/v1`);
        logger.log(`🏥 Health check: http://${host}:${availablePort}/health`);
        const fs = await Promise.resolve().then(() => require('fs'));
        const path = await Promise.resolve().then(() => require('path'));
        const os = await Promise.resolve().then(() => require('os'));
        const tempDir = os.tmpdir();
        const portFile = path.join(tempDir, 'inamsos-server-port');
        fs.writeFileSync(portFile, availablePort.toString());
        logger.log(`📝 Port written to: ${portFile}`);
        return {
            port: availablePort,
            app,
        };
    }
    catch (error) {
        logger.error('❌ Failed to start embedded server:', error);
        throw error;
    }
}
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
//# sourceMappingURL=main-embedded.js.map
