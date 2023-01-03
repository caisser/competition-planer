import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ICategory } from '../interfaces/category.interface';

@Entity({
  name: 'categories',
})
export class Category implements ICategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
