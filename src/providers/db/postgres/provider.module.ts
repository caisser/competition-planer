import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigModule } from '../../../config/db/postgres/config.module';
import { PostgresConfigService } from '../../../config/db/postgres/config.service';
import { Address } from '../../../adresses/entities/adress.entity';

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
        synchronize: false,
        autoLoadEntities: true,
        entities: [Address],
      }),
    }),
  ],
})
export class PostgresDatabaseProviderModule {}
