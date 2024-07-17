import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CHECK_MESSAGES } from 'src/constants/check-message.constant';

export class UpdateCheckItemDto {
  @IsString({ message: CHECK_MESSAGES.CHECKITEM.IS_STRING })
  @IsNotEmpty({ message: CHECK_MESSAGES.CHECKITEM.CONTENT_NOT_EMPTY })
  @ApiProperty({ description: '체크 아이템 내용', example: 'checkItemContent' })
  content: string;

  @IsBoolean({ message: CHECK_MESSAGES.CHECKITEM.IS_BOOLEAN })
  @IsNotEmpty({ message: CHECK_MESSAGES.CHECKITEM.IS_DONE_NOT_EMPTY })
  @ApiProperty({ description: `작업 완료 여부`, example: true })
  isDone: boolean;
}