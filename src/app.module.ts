import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { PostgresDatabaseProviderModule } from './providers/db/postgres/provider.module';
import { EventsController } from './events/events.controller';
import { AppConfigModule } from './config/app/config.module';
import helmet from 'helmet';

@Module({
  imports: [AppConfigModule, PostgresDatabaseProviderModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(helmet()).forRoutes(EventsController);
  }
}
