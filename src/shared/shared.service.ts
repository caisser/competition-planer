import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class SharedService<Model> {
  constructor(private repository: Repository<Model>) {}

  findAll() {
    return this.repository.find();
  }
}
