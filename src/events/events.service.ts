import { Injectable } from '@nestjs/common';
import { Event } from './interfaces/event.interface';

@Injectable()
export class EventsService {
  private readonly events: Event[] = [];

  create(event: Event) {
    this.events.push(event);
  }

  async findAll(): Promise<Event[]> {
    return this.events;
  }

  async findOne(id: number): Promise<Event> {
    return this.events.find((event) => (event.id = id));
  }
}
