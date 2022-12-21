import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import JwtAuthenticationGuard from '../../common/guards/jwtAuthentication.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll(): Promise<Event[]> {
    return await this.eventsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async create(@Body() event: CreateEventDto): Promise<Event> {
    return await this.eventsService.create(event);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): Promise<Event> {
    return await this.eventsService.findOneById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() event: UpdateEventDto,
  ): Promise<Event> {
    return await this.eventsService.update(id, event);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): Promise<string> {
    await this.eventsService.remove(id);
    return `Event with id ${id} deleted`;
  }
}
