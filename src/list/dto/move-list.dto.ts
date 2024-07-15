import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class MoveListDto {
  @IsInt()
  @IsOptional()
  @ApiProperty({ example: '1' })
  toPrevId?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ example: '2' })
  toNextId?: number;
}
