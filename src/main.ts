require('newrelic');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExcludeNullInterceptor } from './common/interceptors/exclude-null.interceptor';
import { AppConfigService } from './config/app/config.service';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get app config settings and starting the app.
  const appConfig: AppConfigService = app.get(AppConfigService);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new ExcludeNullInterceptor());
  app.use(cookieParser(), helmet());

  const port = appConfig.port;

  await app.listen(port, () => {
    console.log(`App runing on http://localhost:${port}`);
  });
}
bootstrap();
