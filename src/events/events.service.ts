import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EntityNotFoundException } from '../common/exceptions/not-found.exception';
import PostgresErrorCode from '../db/postgresErrorCode.enum';
import { User } from '../users/entities/user.entity';
import { QueryParams } from '../utils/types/queryParams';

@Injectable()
export class EventsService {
  private entityName = 'Event';

  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async findAll(options: QueryParams) {
    let query = this.eventsRepository.createQueryBuilder('events');
    if (!options.include) {
      query = query.select('events');
    } else {
      query = this.include(query, options.include);
    }

    if (options.name) {
      query = this.filterByName(query, options.name);
    }

    if (options.limit && options.page) {
      query = this.paginate(query, options.limit, options.page);
    }
    const events = await query.getMany();
    return events;
  }

  private paginate(
    query: SelectQueryBuilder<Event>,
    limit: number,
    page: number,
  ): SelectQueryBuilder<Event> {
    const offset = (page - 1) * limit;
    return query.limit(limit).offset(offset);
  }

  private filterByName(
    query: SelectQueryBuilder<Event>,
    name: string,
  ): SelectQueryBuilder<Event> {
    return query.where('LOWER(events.name) LIKE LOWER(:name)', {
      name: `%${name}%`,
    });
  }

  private include(
    query: SelectQueryBuilder<Event>,
    fields: string,
  ): SelectQueryBuilder<Event> {
    const includeFields = fields.split(',');
    includeFields.forEach((field) => {
      if (field === 'categories')
        query = query.leftJoinAndSelect('events.categories', 'categories');
      if (field === 'athletes')
        query = query.leftJoinAndSelect('events.athletes', 'users');
    });
    return query;
  }

  async create(event: CreateEventDto, user: User): Promise<Event> {
    try {
      const newEvent = this.eventsRepository.create({
        ...event,
        createdBy: user,
      });
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

  async registerAthlete(id: string, user: User) {
    const event = await this.eventsRepository.findOneBy({ id });
    if (!event) throw new EntityNotFoundException(id, this.entityName);

    event.athletes.push(user);
    await this.eventsRepository.save(event);

    return;
  }

  async remove(id: string): Promise<void> {
    const deleteResponse = await this.eventsRepository.delete(id);
    if (!deleteResponse.affected)
      throw new EntityNotFoundException(id, this.entityName);
  }
}
