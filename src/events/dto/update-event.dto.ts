import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MinLength,
  IsBoolean,
} from 'class-validator';

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  @MinLength(10)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  price: number;

  @IsString()
  @MinLength(30)
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
