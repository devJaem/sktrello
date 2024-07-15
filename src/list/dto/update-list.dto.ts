import { PartialType } from '@nestjs/swagger';
import { CreateListDto } from './create-list.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { MESSAGES } from 'src/constants/message.constant';

export class UpdateListDto extends PartialType(CreateListDto) {
  /**
   * List 제목
   * @example "To do"
   */
  @IsString()
  @IsNotEmpty({ message: MESSAGES.LIST.COMMON.TITLE.CHANGE_TITLE })
  title: string;
}
