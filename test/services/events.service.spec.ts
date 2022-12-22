import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateEventDto } from '../../src/events/dto/update-event.dto';
import { DeleteResult } from 'typeorm';
import { Event } from '../../src/events/entities/event.entity';
import { EventsService } from '../../src/events/events.service';

describe('EventsService', () => {
  let eventsService: EventsService;
  const mockedRepo = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getRepositoryToken(Event),
          useValue: mockedRepo,
        },
      ],
    }).compile();

    eventsService = module.get<EventsService>(EventsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('findAll Method', () => {
    let events: Event[];

    beforeEach(() => {
      events = [new Event(), new Event()];
      mockedRepo.find.mockReturnValue(Promise.resolve(events));
    });
    it('Should return an Events array', async () => {
      const findSpy = jest.spyOn(mockedRepo, 'find');

      const fetchedEvents = await eventsService.findAll();

      expect(fetchedEvents).toEqual(events);
      expect(findSpy).toBeCalledTimes(1);
      expect(findSpy).toBeCalledWith();
    });
  });

  describe('findOneById method', () => {
    describe('Event is mached', () => {
      let event: Event;

      beforeEach(() => {
        event = new Event();
        mockedRepo.findOneBy.mockReturnValue(Promise.resolve(event));
      });

      it('Should return a Event', async () => {
        const findOneBySpy = jest.spyOn(mockedRepo, 'findOneBy');
        const fetchedEvent = await eventsService.findOneById(1);

        expect(fetchedEvent).toEqual(event);

        expect(findOneBySpy).toBeCalledTimes(1);
        expect(findOneBySpy).toBeCalledWith({ id: 1 });
      });
    });

    describe('Event is not matched', () => {
      beforeEach(() => {
        mockedRepo.findOneBy.mockReturnValue(undefined);
      });
      it('should throw an error', async () => {
        const findOneBySpy = jest.spyOn(mockedRepo, 'findOneBy');

        await expect(eventsService.findOneById(2)).rejects.toThrow();
        expect(findOneBySpy).toBeCalledTimes(1);
        expect(findOneBySpy).toBeCalledWith({ id: 2 });
      });
    });
  });

  describe('remove Method', () => {
    describe('Event is mached', () => {
      let deleteResponse: DeleteResult;

      beforeEach(() => {
        deleteResponse = new DeleteResult();
        deleteResponse.affected = 1;
        mockedRepo.delete.mockReturnValue(Promise.resolve(deleteResponse));
      });

      it('Should return void', async () => {
        const deleteSpy = jest.spyOn(mockedRepo, 'delete');

        expect(eventsService.remove(1)).resolves;

        expect(deleteSpy).toBeCalledTimes(1);
        expect(deleteSpy).toBeCalledWith(1);
      });
    });

    describe('Event is not matched', () => {
      let deleteResponse: DeleteResult;

      beforeEach(() => {
        deleteResponse = new DeleteResult();
        deleteResponse.affected = 0;
        mockedRepo.delete.mockReturnValue(Promise.resolve(deleteResponse));
      });
      it('should throw an error', async () => {
        const deleteSpy = jest.spyOn(mockedRepo, 'delete');

        await expect(eventsService.remove(1)).rejects.toThrow();
        expect(deleteSpy).toBeCalledTimes(1);
        expect(deleteSpy).toBeCalledWith(1);
      });
    });
  });

  describe('update Method', () => {
    describe('Event is mached', () => {
      let updateEventDto: UpdateEventDto;
      let event: Event;

      beforeEach(() => {
        event = new Event();
        updateEventDto = new UpdateEventDto();
        mockedRepo.update.mockReturnValue(Promise.resolve());
        mockedRepo.findOneBy.mockReturnValue(Promise.resolve(event));
      });

      it('Should return a Event', async () => {
        const updateSpy = jest.spyOn(mockedRepo, 'update');
        const findOneBySpy = jest.spyOn(mockedRepo, 'findOneBy');

        const updatedEvent = await eventsService.update(1, updateEventDto);

        expect(updatedEvent).toEqual(event);

        expect(findOneBySpy).toBeCalledTimes(1);
        expect(updateSpy).toBeCalledTimes(1);
        expect(findOneBySpy).toBeCalledWith({ id: 1 });
        expect(updateSpy).toBeCalledWith(1, updateEventDto);
      });
    });

    describe('Event is not matched', () => {
      let updateEventDto: UpdateEventDto;

      beforeEach(() => {
        updateEventDto = new UpdateEventDto();
        mockedRepo.update.mockReturnValue(Promise.resolve());
        mockedRepo.findOneBy.mockReturnValue(undefined);
      });
      it('should throw an error', async () => {
        const updateSpy = jest.spyOn(mockedRepo, 'update');
        const findOneBySpy = jest.spyOn(mockedRepo, 'findOneBy');

        await expect(eventsService.update(1, updateEventDto)).rejects.toThrow();

        expect(findOneBySpy).toBeCalledTimes(1);
        expect(updateSpy).toBeCalledTimes(1);
        expect(findOneBySpy).toBeCalledWith({ id: 1 });
        expect(updateSpy).toBeCalledWith(1, updateEventDto);
      });
    });
  });
});
