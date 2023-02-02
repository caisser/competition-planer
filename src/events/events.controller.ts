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
  HttpCode,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Auth } from '../common/decorators/auth/auth.decorator';
import { UserRole } from '../users/emun/userRole.enum';
import RequestWithUser from '../auth/interfaces/requestWithUser.interface';
import { QueryParams } from '../utils/types/queryParams';

@Controller('events')
@UseInterceptors(ClassSerializerInterceptor)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll(@Query() options: QueryParams): Promise<Event[]> {
    return await this.eventsService.findAll(options);
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
  @Auth(UserRole.ADMIN, UserRole.EVENT_MANAGER)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() event: UpdateEventDto,
  ): Promise<Event> {
    return await this.eventsService.update(id, event);
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN, UserRole.EVENT_MANAGER)
  async delete(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): Promise<string> {
    await this.eventsService.remove(id);
    return `Event with id ${id} deleted`;
  }

  @Post(':id/register')
  @HttpCode(200)
  @Auth(UserRole.ATHLETE)
  async register(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Req() req: RequestWithUser,
  ) {
    const { user } = req;
    await this.eventsService.registerAthlete(id, user);
  }
}
