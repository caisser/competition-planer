import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ObjectWithIdDto } from '../../utils/types/objectWithId.dto';

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

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ObjectWithIdDto)
  categories: ObjectWithIdDto[];
}
