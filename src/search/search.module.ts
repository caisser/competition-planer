import { Module } from '@nestjs/common';
import { ElasticsearchConfigModule } from '../config/elasticsearch/config.module';
import { ElasticsearchConfigService } from '../config/elasticsearch/config.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchConfigModule,
    ElasticsearchModule.registerAsync({
      imports: [ElasticsearchConfigModule],
      useFactory: async (configService: ElasticsearchConfigService) => ({
        node: configService.elasticsearchNode,
        auth: {
          username: configService.elasticsearchUsername,
          password: configService.elasticsearchPassword,
        },
      }),
      inject: [ElasticsearchConfigService],
    }),
  ],
  exports: [ElasticsearchModule],
})
export class SearchModule {}
