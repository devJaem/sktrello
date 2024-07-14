import { MESSAGES } from 'src/constants/message.constants';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class InviteBoardMemberDto {
  @IsEmail()
  @IsNotEmpty({ message: MESSAGES.BOARD.COMMON.EMAIL.NO_EMAIL })
  email: string;
}
