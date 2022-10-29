import { Logger, Module } from '@nestjs/common';
import { PostgresDatabaseProviderModule } from '../../providers/db/postgres/provider.module';
import { EventsSeederModule } from './events/events.module';
import { Seeder } from './seeder';

@Module({
  imports: [PostgresDatabaseProviderModule, EventsSeederModule],
  providers: [Logger, Seeder],
})
export class SeederModule {}
