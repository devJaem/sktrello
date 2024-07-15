import { MESSAGES } from 'src/constants/message.constant';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty({ message: MESSAGES.BOARD.COMMON.TITLE.NO_TITLE })
  title: string;

  @IsString()
  @IsNotEmpty({ message: MESSAGES.BOARD.COMMON.COLOR.NO_COLOR })
  color: string;
}
