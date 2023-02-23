import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ElasticsearchConfigService {
  constructor(private configService: ConfigService) {}

  get elasticsearchNode(): string {
    return String(this.configService.get<string>('elasticsearch.node'));
  }

  get elasticsearchUsername(): string {
    return String(this.configService.get<string>('elasticsearch.username'));
  }

  get elasticsearchPassword(): string {
    return String(this.configService.get<string>('elasticsearch.password'));
  }
}
