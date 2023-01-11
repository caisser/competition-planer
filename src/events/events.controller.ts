import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseUUIDPipe,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Auth } from '../common/decorators/auth/auth.decorator';
import { UserRole } from '../users/emun/userRole.enum';
import RequestWithUser from '../auth/interfaces/requestWithUser.interface';

@Controller('events')
@UseInterceptors(ClassSerializerInterceptor)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @Auth()
  async findAll(): Promise<Event[]> {
    return await this.eventsService.findAll();
  }

  @Post()
  @Auth(UserRole.ADMIN, UserRole.EVENT_MANAGER)
  async create(
    @Body() event: CreateEventDto,
    @Req() req: RequestWithUser,
  ): Promise<Event> {
    const { user } = req;
    return await this.eventsService.create(event, user);
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
