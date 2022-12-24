import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EntityNotFoundException } from '../common/exceptions/not-found.exception';
import PostgresErrorCode from '../db/postgresErrorCode.enum';

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
    try {
      const newEvent = this.eventsRepository.create(event);
      await this.eventsRepository.save(newEvent);
      return newEvent;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(error?.detail, HttpStatus.BAD_REQUEST);
      }
      console.log(error);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneById(id: string): Promise<Event> {
    const event = await this.eventsRepository.findOneBy({ id });
    if (event) return event;

    throw new EntityNotFoundException(id, this.entityName);
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    await this.eventsRepository.update(id, updateEventDto);
    const updatedEvent = await this.eventsRepository.findOneBy({ id });
    if (updatedEvent) return updatedEvent;

    throw new EntityNotFoundException(id, this.entityName);
  }

  async remove(id: string): Promise<void> {
    const deleteResponse = await this.eventsRepository.delete(id);
    if (!deleteResponse.affected)
      throw new EntityNotFoundException(id, this.entityName);
  }
}
