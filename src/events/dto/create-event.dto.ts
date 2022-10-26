import { IsString, IsInt } from 'class-validator';

export class CreateEventDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsInt()
  price: number;

  @IsString()
  description: string;
}
