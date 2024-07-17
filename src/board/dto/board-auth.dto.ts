import { BOARD_MESSAGES } from 'src/constants/board-message.constant';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BoardUserRole } from '../types/board-user.type';

export class BoardAuthDto {
  @IsNumber()
  @IsNotEmpty({ message: BOARD_MESSAGES.BOARD.BOARD_AUTH.FAILURE.NO_USERID })
  @ApiProperty({ example: '1' })
  userId: number;

  @IsEnum(BoardUserRole)
  @IsNotEmpty({ message: BOARD_MESSAGES.BOARD.BOARD_AUTH.FAILURE.NO_ROLE })
  @ApiProperty({ example: 'ADMIN' })
  boardUserRole: BoardUserRole;
}
