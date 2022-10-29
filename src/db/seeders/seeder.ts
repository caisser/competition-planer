import { Injectable, Logger } from '@nestjs/common';
import { EventsSeederService } from './events/events.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly eventsSeederService: EventsSeederService,
  ) {}

  async seed() {
    await this.Events()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding users...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding users...');
        Promise.reject(error);
      });
  }

  async Events() {
    return await Promise.all(this.eventsSeederService.create())
      .then((createdEvents) => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of Events created : ' +
            // Remove all null values and return only created Eventss.
            createdEvents.filter(
              (nullValueOrCreatedEvents) => nullValueOrCreatedEvents,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
