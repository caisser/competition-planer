import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IAddress } from '../interfaces/adress.interface';
import { User } from '../../users/entities/user.entity';

@Entity({
  name: 'addresses',
})
export class Address implements IAddress {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @OneToOne(() => User, (user: User) => user.address)
  user: User;
}
