import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../../../models/events/entities/event.entity';
import { EventsSeederService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [EventsSeederService],
  exports: [EventsSeederService],
})
export class EventsSeederModule {}
