import { IsInt, IsOptional } from 'class-validator';

export class MoveListDto {
  @IsInt()
  @IsOptional()
  toPrevId?: number;

  @IsInt()
  @IsOptional()
  toNextId?: number;
}
