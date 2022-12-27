import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  IsObject,
} from 'class-validator';
import { UserRole } from '../../users/emun/userRole.enum';
import { Address } from '../../adresses/entities/adress.entity';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;

  @IsString()
  @IsNotEmpty()
  role: UserRole;

  @IsObject()
  @IsNotEmpty()
  address: Address;
}
