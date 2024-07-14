import { PartialType } from '@nestjs/swagger';
import { CreateListDto } from './create-list.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateListDto extends PartialType(CreateListDto) {
  @IsString()
  @IsNotEmpty({ message: '제목을 수정해 주세요.' })
  title: string;
}
