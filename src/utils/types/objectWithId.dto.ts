import { IsUUID } from 'class-validator';

export class ObjectWithIdDto {
  @IsUUID()
  id: string;
}
