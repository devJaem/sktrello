import { IsInt, IsOptional } from 'class-validator';

export class MoveListDto {
  /**
   * @example "1"
   */
  @IsInt()
  @IsOptional()
  toPrevId?: number;

  /**
   * @example "2"
   */
  @IsInt()
  @IsOptional()
  toNextId?: number;
}
