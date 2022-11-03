import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly logger: Logger,
  ) {}

  @Get()
  async findAll(): Promise<Event[]> {
    this.logger.verbose('Returning all the events');
    return await this.eventsService.findAll();
  }

  @Post()
  async create(@Body() event: CreateEventDto): Promise<Event> {
    return await this.eventsService.create(event);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<Event> {
    return await this.eventsService.findOneById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() event: UpdateEventDto,
  ): Promise<Event> {
    return await this.eventsService.update(id, event);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<string> {
    await this.eventsService.remove(id);
    return `Event with id ${id} deleted`;
  }
}
