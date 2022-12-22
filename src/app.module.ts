import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { EventsModule } from './events/events.module';
import { PostgresDatabaseProviderModule } from './providers/db/postgres/provider.module';
import { AppConfigModule } from './config/app/config.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { AuthenticationModule } from './auth/authentication.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AppConfigModule,
    PostgresDatabaseProviderModule,
    EventsModule,
    UsersModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
