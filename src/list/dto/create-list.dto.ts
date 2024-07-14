import { PickType } from '@nestjs/swagger';
import { List } from '../entities/list.entity';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateListDto extends PickType(List, [
  'boardId',
  'title',
  'listOrder', // listOrder 가져오는게 맞는지 ?
]) {
  @IsInt()
  boardId: number;

  @IsString()
  @IsNotEmpty({ message: '제목을 입력해 주세요.' })
  title: string;

  // listOrder 가져오는게 맞는건지 ???!
  @IsString()
  listOrder: string;
}
