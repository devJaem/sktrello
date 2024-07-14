import { PickType } from '@nestjs/swagger';
import { List } from '../entities/list.entity';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { MESSAGES } from 'src/constants/message.constants';

export class CreateListDto extends PickType(List, ['boardId', 'title']) {
  @IsInt()
  boardId: number;

  @IsString()
  @IsNotEmpty({ message: MESSAGES.LIST.COMMON.TITLE.NO_TITLE })
  title: string;
}
