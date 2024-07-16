import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBoardDto } from './create-board.dto';
import { IsString } from 'class-validator';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @IsString()
  @ApiProperty({ example: '수정할 보드 제목' })
  title: string;

  @IsString()
  @ApiProperty({ example: '#FFFFFF' })
  color: string;
}
