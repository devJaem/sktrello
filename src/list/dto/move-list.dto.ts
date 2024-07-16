import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class MoveListDto {
  @IsInt()
  @IsOptional()
  @ApiProperty({
    example: 1,
    description: '이동할 위치의 이전 listId',
    required: false,
  })
  toPrevId?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    example: 2,
    description: '이동할 위치의 이후 listId',
    required: false,
  })
  toNextId?: number;
}
