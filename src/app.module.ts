import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { EventsModule } from './models/events/events.module';
import { PostgresDatabaseProviderModule } from './providers/db/postgres/provider.module';
import { AppConfigModule } from './config/app/config.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

@Module({
  imports: [AppConfigModule, PostgresDatabaseProviderModule, EventsModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
