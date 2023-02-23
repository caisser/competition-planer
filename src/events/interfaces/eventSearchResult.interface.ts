import { EventSearchBody } from './eventSearchBody.interface';

export interface EventSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: EventSearchBody;
    }>;
  };
}
