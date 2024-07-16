import { BOARD_MESSAGES } from 'src/constants/board-message.constant';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InviteBoardMemberDto {
  @IsEmail()
  @IsNotEmpty({ message: BOARD_MESSAGES.BOARD.COMMON.EMAIL.NO_EMAIL })
  @ApiProperty({ example: 'example@naver.com' })
  email: string;
}
