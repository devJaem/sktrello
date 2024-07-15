import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateListDto } from './create-list.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { LIST_MESSAGES } from 'src/constants/list-message.constant';

export class UpdateListDto extends PartialType(CreateListDto) {
  @IsString()
  @IsNotEmpty({ message: LIST_MESSAGES.LIST.COMMON.TITLE.CHANGE_TITLE })
  @ApiProperty({ example: 'To do' })
  title: string;
}
