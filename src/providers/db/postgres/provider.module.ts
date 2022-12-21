import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../../../models/events/entities/event.entity';
import { PostgresConfigModule } from '../../../config/db/postgres/config.module';
import { PostgresConfigService } from '../../../config/db/postgres/config.service';
import { User } from '../../../models/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule],
      inject: [PostgresConfigService],
      useFactory: async (postgresConfigService: PostgresConfigService) => ({
        type: 'postgres',
        host: postgresConfigService.host,
        port: postgresConfigService.port,
        username: postgresConfigService.username,
        password: postgresConfigService.password,
        database: postgresConfigService.database,
        entities: [Event, User],
        synchronize: false,
      }),
    }),
  ],
})
export class PostgresDatabaseProviderModule {}
