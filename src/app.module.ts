import { Module } from '@nestjs/common';

import { EventsModule } from './models/events/events.module';
import { PostgresDatabaseProviderModule } from './providers/db/postgres/provider.module';
import { AppConfigModule } from './config/app/config.module';

@Module({
  imports: [AppConfigModule, PostgresDatabaseProviderModule, EventsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
