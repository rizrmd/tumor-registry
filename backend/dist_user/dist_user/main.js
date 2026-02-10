"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const helmet_1 = require("@fastify/helmet");
const cors_1 = require("@fastify/cors");
const multipart_1 = require("@fastify/multipart");
const static_1 = require("@fastify/static");
const path_1 = require("path");
const fs = require("fs");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const adapter = new platform_fastify_1.FastifyAdapter({
        logger: false,
        trustProxy: true,
        bodyLimit: 10485760,
    });
    const app = await core_1.NestFactory.create(app_module_1.AppModule, adapter);
    const configService = app.get(config_1.ConfigService);
    const logger = new common_1.Logger('Bootstrap');
    await app.register(helmet_1.default, {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: [`'self'`],
                styleSrc: [`'self'`, `'unsafe-inline'`],
                imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
                scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
            },
        },
    });
    const isDev = configService.get('NODE_ENV') !== 'production';
    const corsOrigins = [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'http://localhost:3003',
        'https://localhost:3000',
        'https://localhost:3001',
        'wails://wails.localhost:34115',
        'wails://wails.localhost',
        'wails.localhost',
        'https://wails.localhost',
        'wails://localhost',
        'app://wails',
        'wails://',
        'file://',
        null,
        configService.get('FRONTEND_URL'),
    ].filter(Boolean);
    await app.register(cors_1.default, {
        origin: (origin, cb) => {
            if (!origin || origin === 'null') {
                cb(null, true);
                return;
            }
            const allowed = corsOrigins.some((allowed) => {
                if (!allowed)
                    return false;
                return origin === allowed || origin.startsWith(allowed) || origin.includes('localhost');
            });
            if (isDev && (origin.includes('localhost') || origin.includes('127.0.0.1'))) {
                cb(null, true);
                return;
            }
            cb(null, allowed);
        },
        credentials: true,
    });
    await app.register(multipart_1.default, {
        limits: {
            fileSize: 10 * 1024 * 1024,
        },
        attachFieldsToBody: false,
    });
    const frontendPath = (0, path_1.join)(process.cwd(), '../frontend/out');
    if (fs.existsSync(frontendPath)) {
        logger.log(`📱 Serving frontend UI from: ${frontendPath}`);
        await app.register(static_1.default, {
            root: frontendPath,
            prefix: '/',
            wildcard: true,
            index: ['index.html'],
        });
    }
    else {
        logger.warn(`⚠️  Frontend build not found at ${frontendPath}. Standalone UI will not be available.`);
    }
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    app.setGlobalPrefix('api/v1');
    const config = new swagger_1.DocumentBuilder()
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
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = configService.get('PORT') || 3001;
    await app.listen(port, '0.0.0.0');
    logger.log(`🚀 Application running on http://localhost:${port}`);
    logger.log(`📚 API documentation available at http://localhost:${port}/api/docs`);
    logger.log(`⚡ Powered by Fastify + Bun`);
}
bootstrap().catch((error) => {
    console.error('❌ Bootstrap failed:', error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map
