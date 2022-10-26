import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExcludeNullInterceptor } from './common/interceptors/exclude-null.interceptor';
// import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { logger } from './common/middleware/logger.middleware';
import { ValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ExcludeNullInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  const port = 3000;
  await app.listen(port, () => {
    console.log(`App runing on http://localhost:${port}`);
  });
}
bootstrap();
