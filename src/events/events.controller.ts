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
  Query,
  DefaultValuePipe,
  ParseBoolPipe,
  UseGuards,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';

import { CreateEventDto } from './dto/create-event.dto';
// import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';
import { Event } from './interfaces/event.interface';
// import { ForbiddenException } from '../common/exceptions/forbidden.exception';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/metadata/roles.decorator';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { User } from '../common/decorators/requests/user.decorator';

@Controller('events')
@UseFilters(HttpExceptionFilter)
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @UseInterceptors(TransformInterceptor)
  async findAll(
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe)
    activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe)
    page: number,
  ): Promise<Event[]> {
    //throw new ForbiddenException();
    console.log('This action returns all events');
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
