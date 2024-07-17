import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { USER_MESSAGES } from 'src/constants/user-message.constant';

export class UserUpdateDto {
  @IsEmail()
  @IsOptional()
  @IsNotEmpty({
    message: USER_MESSAGES.USER.USERINFO.UPDATE.FAILURE.EMAIL.EMPTY,
  })
  @ApiProperty({ example: 'example@sample.com' })
  email: string;

  @IsString()
  @IsNotEmpty({
    message: USER_MESSAGES.USER.USERINFO.UPDATE.FAILURE.NICKNAME.EMPTY,
  })
  @ApiProperty({ example: 'John Doe' })
  nickname: string;
}
