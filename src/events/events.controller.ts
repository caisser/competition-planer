import {
  Controller,
  Get,
  Post,
  // Patch,
  // Delete,
  // HttpCode,
  // Header,
  // Param,
  Body,
} from '@nestjs/common';

import { CreateEventDto } from './dto/create-event.dto';
// import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';
import { Event } from './interfaces/event.interface';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll(): Promise<Event[]> {
    console.log('This action returns all events');
    return await this.eventsService.findAll();
  }

  @Post()
  create(@Body() createEventDto: CreateEventDto): void {
    this.eventsService.create(createEventDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string): string {
  //   return `This action returns event ${id}`;
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateEventDto: UpdateEventDto,
  // ): string {
  //   return `Event with id ${id} updated`;
  // }

  // @Delete(':id')
  // delete(@Param('id') id: string): string {
  //   return `Event with id ${id} deleted`;
  // }
}
