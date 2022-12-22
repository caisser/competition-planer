import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from '../../users/emun/userRole.enum';

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
}
