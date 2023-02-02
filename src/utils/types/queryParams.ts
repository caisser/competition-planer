import { IsNumber, Min, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryParams {
  @IsOptional()
  @Type(() => String)
  @IsString()
  name?: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  include?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;
}
