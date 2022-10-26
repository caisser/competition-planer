import {
  Controller,
  Get,
  Post,
  // Patch,
  // Delete,
  // HttpCode,
  // Header,
  Param,
  Body,
  // HttpException,
  HttpStatus,
  UseFilters,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateEventDto } from './dto/create-event.dto';
// import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';
import { Event } from './interfaces/event.interface';
// import { ForbiddenException } from '../common/exceptions/forbidden.exception';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { ValidationPipe } from '../common/pipes/validation.pipe';

@Controller('events')
@UseFilters(HttpExceptionFilter)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll(): Promise<Event[]> {
    //throw new ForbiddenException();
    console.log('This action returns all events');
    return await this.eventsService.findAll();
  }

  @Post()
  create(@Body(new ValidationPipe()) createEventDto: CreateEventDto): void {
    //throw new ForbiddenException();
    this.eventsService.create(createEventDto);
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Event> {
    return await this.eventsService.findOne(id);
  }

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
