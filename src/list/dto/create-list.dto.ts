import { PickType } from '@nestjs/swagger';
import { List } from '../entities/list.entity';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { LIST_MESSAGES } from 'src/constants/list-message.constant';

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
  @IsNotEmpty({ message: LIST_MESSAGES.LIST.COMMON.TITLE.NO_TITLE })
  title: string;
}
