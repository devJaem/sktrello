import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CHECK_MESSAGES } from 'src/constants/check-message.constant';
export class CreateCheckItemDto {
  @IsNumber()
  @IsNotEmpty({ message: CHECK_MESSAGES.CHECKLIST.ID_IS_NOT_EMPTY })
  @ApiProperty({ description: '체크리스트 아이디', example: 1 })
  checkListId: number;

  @IsString({ message: CHECK_MESSAGES.CHECKITEM.IS_STRING })
  @IsNotEmpty({ message: CHECK_MESSAGES.CHECKITEM.CONTENT_NOT_EMPTY })
  @ApiProperty({
    description: '체크리스트 아이탬 내용',
    example: 'checkItemContent',
  })
  content: string;
}
