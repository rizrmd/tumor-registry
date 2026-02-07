export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',

  database: {
    url: process.env.DATABASE_URL,
  },

  // Remote sync configuration (for desktop app)
  remoteSync: {
    // URL of the central server to fetch remote DB config from
    // Default: https://inamsos.com (production central server)
    centralServerUrl: process.env.CENTRAL_SERVER_URL || 'https://inamsos.com',
    // JWT token for authenticating with central server
    jwtToken: process.env.USER_JWT_TOKEN,
    // Fallback: Direct remote DB URL (if not using config fetch)
    directUrl: process.env.REMOTE_DATABASE_URL,
  },

  redis: {
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },

  app: {
    name: process.env.APP_NAME || 'INAMSOS',
    version: process.env.APP_VERSION || '1.0.0',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },

  minio: {
    endPoint: process.env.MINIO_ENDPOINT || 'localhost',
    port: parseInt(process.env.MINIO_PORT, 10) || 9000,
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    bucket: process.env.MINIO_BUCKET || 'inamsos-files',
  },
});
