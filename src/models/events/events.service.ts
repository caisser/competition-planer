import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { IEvent } from './interfaces/event.interface';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  findAll(isActive: boolean): Promise<Event[]> {
    return this.eventsRepository.find({
      where: {
        isActive,
      },
    });
  }

  create(event: CreateEventDto): Promise<Event> {
    return this.eventsRepository.save(event);
  }

  findOne(id: number): Promise<Event> {
    return this.eventsRepository.findOneBy({ id });
  }

  update(id: number, event: UpdateEventDto): Promise<Event> {
    return this.eventsRepository.save({ id, ...event });
  }

  async remove(id: number): Promise<void> {
    await this.eventsRepository.delete(id);
  }
}
