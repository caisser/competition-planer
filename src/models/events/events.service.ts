import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { IEvent } from './interfaces/event.interface';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  findAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  // create(event: Event) {
  //   this.events.push(event);
  // }

  findOne(id: number): Promise<Event> {
    return this.eventsRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.eventsRepository.delete(id);
  }
}
