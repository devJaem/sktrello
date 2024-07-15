import { PickType } from '@nestjs/swagger';
import { List } from '../entities/list.entity';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { MESSAGES } from 'src/constants/message.constants';

export class CreateListDto extends PickType(List, ['boardId', 'title']) {
  /**
   * Board Id
   * @example "1"
   */
  @IsInt()
  boardId: number;

  /**
   * List 제목
   * @example "To do"
   */
  @IsString()
  @IsNotEmpty({ message: MESSAGES.LIST.COMMON.TITLE.NO_TITLE })
  title: string;
}
