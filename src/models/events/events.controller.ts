import {
  Controller,
  Get,
  ParseBoolPipe,
  Query,
  // Post,
  // Patch,
  // Delete,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly logger: Logger,
  ) {}

  @Get()
  async findAll(
    @Query('isActive', ParseBoolPipe) isActive: boolean,
  ): Promise<Event[]> {
    this.logger.verbose('Returning all the events');
    return await this.eventsService.findAll();
  }

  // @Post()
  // @Roles('admin')
  // create(@Body() createEventDto: CreateEventDto): void {
  //   //throw new ForbiddenException();
  //   this.eventsService.create({ ...createEventDto, isActive: true });
  // }

  // @Get(':id')
  // async findOne(
  //   @Param(
  //     'id',
  //     new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  //   )
  //   id: number,
  //   @User() user: any,
  // ): Promise<Event> {
  //   console.log(user);
  //   return await this.eventsService.findOne(id);
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
