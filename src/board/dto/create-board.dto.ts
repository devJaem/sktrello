import { BOARD_MESSAGES } from 'src/constants/board-message.constant';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty({ message: BOARD_MESSAGES.BOARD.COMMON.TITLE.NO_TITLE })
  @ApiProperty({ example: '생성할 보드 제목' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: BOARD_MESSAGES.BOARD.COMMON.COLOR.NO_COLOR })
  @ApiProperty({ example: '#FFFFFF' })
  color: string;
}
