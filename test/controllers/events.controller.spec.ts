import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from '../../src/events/events.controller';
import { EventsService } from '../../src/events/events.service';

describe('EventsController', () => {
  let controller: EventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [EventsService],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  it.skip('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
