import { Injectable } from '@nestjs/common';
import { FindManyOptions, Repository, Like } from 'typeorm';
import { QueryParams } from '../utils/types/queryParams';

@Injectable()
export class SharedService<Model> {
  constructor(private repository: Repository<Model>) {}

  getAll(options: QueryParams) {
    console.log(options);
    // const query = {
    //   name: Like('Fitland'),
    // };
    const events = this.repository
      .createQueryBuilder()
      .select()
      .where('name = :name', { name: Like('Fitland') })
      .getMany();

    return events;
  }

  private filter(options: QueryParams): FindManyOptions {
    if (options) {
      return;
    }
  }
}
