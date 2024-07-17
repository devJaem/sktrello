import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CHECK_MESSAGES } from 'src/constants/check-message.constant';

export class CreateCheckListDto {
  @IsNumber()
  @IsNotEmpty({ message: CHECK_MESSAGES.CHECKLIST.CARD_ID_IS_NOT_EMPTY })
  @ApiProperty({ description: '카드 아이디', example: 1 })
  cardId: number;

  @IsString()
  @IsNotEmpty({ message: CHECK_MESSAGES.CHECKLIST.TITLE_IS_NOT_EMPTY })
  @ApiProperty({ description: '카드 아이디', example: 'cardTitle' })
  title: string;
}
