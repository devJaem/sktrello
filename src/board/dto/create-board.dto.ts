import { BOARD_MESSAGES } from 'src/constants/board-message.constant';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty({ message: BOARD_MESSAGES.BOARD.COMMON.TITLE.NO_TITLE })
  title: string;

  @IsString()
  @IsNotEmpty({ message: BOARD_MESSAGES.BOARD.COMMON.COLOR.NO_COLOR })
  color: string;
}
