import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationTime: process.env.JWT_EXPIRATION_TIME,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtRefreshExpirationTime: process.env.JWT_REFRESH_EXPIRATION_TIME,
}));
