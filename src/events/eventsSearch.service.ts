import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Event } from './entities/event.entity';
import { EventSearchResult } from './interfaces/eventSearchResult.interface';
import { EventSearchBody } from './interfaces/eventSearchBody.interface';

@Injectable()
export default class EventsSearchService {
  index = 'events';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexPost(event: Event) {
    return this.elasticsearchService.index<EventSearchResult, EventSearchBody>({
      index: this.index,
      body: {
        id: event.id,
        name: event.name,
        price: event.price,
        description: event.description,
      },
    });
  }

  async search(text: string) {
    const { body } = await this.elasticsearchService.search<EventSearchResult>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['name', 'description'],
          },
        },
      },
    });
    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }
}
