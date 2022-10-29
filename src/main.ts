import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExcludeNullInterceptor } from './common/interceptors/exclude-null.interceptor';
// import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { logger } from './common/middleware/logger.middleware';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { AppConfigService } from './config/app/config.service';
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get app config for cors settings and starting the app.
  const appConfig: AppConfigService = app.get(AppConfigService);

  app.use(logger, helmet());
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ExcludeNullInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  const port = appConfig.port;

  await app.listen(port, () => {
    console.log(`App runing on http://localhost:${port}`);
  });
}
bootstrap();
