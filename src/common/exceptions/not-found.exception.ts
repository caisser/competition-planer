import { NotFoundException } from '@nestjs/common';

export class EntityNotFoundException extends NotFoundException {
  constructor(id: number, entityName: string) {
    super(`${entityName} with id: ${id} doesn't exist`);
  }
}
