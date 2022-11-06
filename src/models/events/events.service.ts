import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EntityNotFoundException } from '../../common/exceptions/not-found.exception';

@Injectable()
export class EventsService {
  private entityName = 'Event';

  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  findAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  async create(event: CreateEventDto): Promise<Event> {
    const newEvent = this.eventsRepository.create(event);
    await this.eventsRepository.save(newEvent);
    return newEvent;
  }

  async findOneById(id: number): Promise<Event> {
    const event = await this.eventsRepository.findOneBy({ id });
    if (event) return event;

    throw new EntityNotFoundException(id, this.entityName);
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    await this.eventsRepository.update(id, updateEventDto);
    const updatedEvent = await this.eventsRepository.findOneBy({ id });
    if (updatedEvent) return updatedEvent;

    throw new EntityNotFoundException(id, this.entityName);
  }

  async remove(id: number): Promise<void> {
    const deleteResponse = await this.eventsRepository.delete(id);
    if (!deleteResponse.affected)
      throw new EntityNotFoundException(id, this.entityName);
  }
}
