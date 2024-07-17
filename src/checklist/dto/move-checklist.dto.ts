import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MoveCheckListDto {
  @ApiProperty({
    example: 1,
    description: '카드 내부에서 이동할 때 사용되는 목표 순서값',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  targetOrder?: number; // 체크리스트 내부에서 이동할 때 사용

  @ApiProperty({
    example: 2,
    description: '다른 카드로 이동할 때 사용되는 목표 카드 ID',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  targetCardId?: number; // 다른 카드로 이동할 때 사용
}