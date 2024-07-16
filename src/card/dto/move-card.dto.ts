import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MoveCardDto {
  @IsInt()
  @IsOptional()
  @ApiProperty({
    example: 1,
    description: '이동할 리스트의 listId',
    required: false,
  })
  listId?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    example: 1,
    description: '이동할 위치의 이전 CardId',
    required: false,
  })
  toPrevId?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    example: 2,
    description: '이동할 위치의 이후 CardId',
    required: false,
  })
  toNextId?: number;
}
