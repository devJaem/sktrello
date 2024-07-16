import { ApiProperty, PickType } from '@nestjs/swagger';
import { List } from '../entities/list.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { LIST_MESSAGES } from 'src/constants/list-message.constant';

export class CreateListDto extends PickType(List, ['title']) {
  @IsString()
  @IsNotEmpty({ message: LIST_MESSAGES.LIST.COMMON.TITLE.NO_TITLE })
  @ApiProperty({ example: 'To do', description: 'List 이름' })
  title: string;
}
