import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  JoinTable,
  ManyToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { IEvent } from '../interfaces/event.interface';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../users/entities/user.entity';

@Entity({
  name: 'events',
})
export class Event implements IEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToMany(() => Category, { eager: true })
  @JoinTable()
  categories: Category[];

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user: User) => user.eventsCreated, { eager: true })
  createdBy: User;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;
}
