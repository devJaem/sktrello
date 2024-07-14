import { PickType } from '@nestjs/swagger';
import { List } from '../entities/list.entity';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { MESSAGES } from 'src/constants/message.constants';

export class CreateListDto extends PickType(List, [
  'boardId',
  'title',
  'listOrder', // listOrder 가져오는게 맞는지 ?
]) {
  @IsInt()
  boardId: number;

  @IsString()
  @IsNotEmpty({ message: MESSAGES.LIST.COMMON.TITLE.NO_TITLE })
  title: string;

  // listOrder 가져오는게 맞는건지 ???!
  @IsString()
  listOrder: string;
}
