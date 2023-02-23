import { Module } from '@nestjs/common';
import configuration from './config';
import { ElasticsearchConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [ConfigService, ElasticsearchConfigService],
  exports: [ConfigService, ElasticsearchConfigService],
})
export class ElasticsearchConfigModule {}
