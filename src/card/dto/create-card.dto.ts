import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { DuedateStatus } from '../types/duedate-status.type';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  duedate: Date;

  @IsOptional()
  @IsEnum(DuedateStatus)
  duedate_status: DuedateStatus;

  @IsOptional()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  cardOrder: string;

  @IsNotEmpty()
  @IsNumber()
  listId: number;
}
