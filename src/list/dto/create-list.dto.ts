import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';
import { LIST_MESSAGES } from 'src/constants/list-message.constant';
import { MoveListDto } from './move-list.dto';

export class CreateListDto extends MoveListDto {
  @IsString()
  @IsNotEmpty({ message: LIST_MESSAGES.LIST.COMMON.TITLE.NO_TITLE })
  @ApiProperty({ example: 'To do', description: 'List 이름' })
  title: string;
}
