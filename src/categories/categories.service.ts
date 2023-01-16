import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class CategoriesService extends SharedService<Category> {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {
    super(categoriesRepository);
  }
}
