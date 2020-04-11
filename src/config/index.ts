export const config = {
  appName: 'Z.io learning server',
  mongodbURI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017',
  isDevelopment: process.env.NODE_ENV === 'development',
  authToken: {
    key: process.env.AUTHTOKEN_KEY || 'dxcRsassa!e3%C^sFVDSdSDR$!^',
    life: process.env.AUTHTOKEN_LIFE || 900,
  },
  refreshToken: {
    key: process.env.REFRESHTOKEN_KEY || 'dSDR$!^dxc5w*(fds)ffdSDR$!^dxc',
    life: process.env.REFRESHTOKEN_LIFE || 86400,
  },
  db: {
    name: process.env.DB_NAME || 'learning-db',
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    authdb: process.env.AUTH_DB,
  },
  server: {
    certPath: process.env.CERT_PATH,
    port: process.env.PORT || 10000,
    keyPath: process.env.KEY_PATH,
  },
  dateFormat: 'YYYY-MM-DD',
};
