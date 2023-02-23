import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from './entities/event.entity';
import { SearchModule } from '../search/search.module';
import EventsSearchService from './eventsSearch.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), SearchModule],
  controllers: [EventsController],
  providers: [EventsService, EventsSearchService],
})
export class EventsModule {}
