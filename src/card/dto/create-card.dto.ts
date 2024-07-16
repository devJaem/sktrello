import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { DuedateStatus } from '../types/duedate-status.type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '카드 제목', example: '대상혁과 친해지기' })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: '카드 내용',
    example: '대상혁과 친해지기 위해서는 우선 전화번호를 딸 필요가 있다.',
  })
  description: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ description: '마감 기한', example: '2024-08-31' })
  duedate: Date;

  @IsOptional()
  @IsEnum(DuedateStatus)
  @ApiProperty({ description: '마감 상태', example: 'UNCOMPLETE' })
  duedate_status: DuedateStatus;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '카드 색깔', example: '#FFFFF1' })
  color: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '카드 순서', example: 'XXXXXXY' })
  cardOrder: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: '리스트 아이디', example: 1 })
  listId: number;
}
