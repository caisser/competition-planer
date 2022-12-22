import { IsString, IsNumber, IsNotEmpty, MinLength } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @MinLength(10)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @MinLength(30)
  description: string;
}
