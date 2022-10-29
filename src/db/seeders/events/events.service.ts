import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../../models/events/entities/event.entity';
import { events } from './data';
import { IEvent } from '../../../models/events/interfaces/event.interface';

@Injectable()
export class EventsSeederService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}

  create(): Array<Promise<Event>> {
    return events.map(async (event: IEvent) => {
      return await this.eventsRepository
        .findOneBy({ name: event.name })
        .then(async (dbEvent) => {
          if (dbEvent) return Promise.resolve(null);
          return Promise.resolve(await this.eventsRepository.save(event));
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
