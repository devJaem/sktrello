import { OmitType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DuedateStatus } from '../types/duedate-status.type';

export class UpdateCardDto extends OmitType(CreateCardDto, ['listId']) {
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
}
