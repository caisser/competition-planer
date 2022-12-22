import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';
import { UserRole } from '../emun/userRole.enum';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(10)
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: UserRole;
}
