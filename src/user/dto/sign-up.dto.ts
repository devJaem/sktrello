import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { USER_MESSAGES } from 'src/constants/user-message.constant';

export class SignUpDto {
  @IsString()
  @IsNotEmpty({ message: USER_MESSAGES.USER.SIGNUP.EMAIL.EMPTY })
  @ApiProperty({ example: 'example@sample.com' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: USER_MESSAGES.USER.SIGNUP.PASSWORD.EMPTY })
  @IsStrongPassword(
    {},
    { message: USER_MESSAGES.USER.SIGNUP.PASSWORD.WEAKPASSWORD }
  )
  @ApiProperty({ example: 'Example1@' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: USER_MESSAGES.USER.SIGNUP.PASSWORD.EMPTY })
  @ApiProperty({ example: 'Example1@' })
  passwordConfirm: string;

  @IsString()
  @IsNotEmpty({ message: USER_MESSAGES.USER.SIGNUP.NICKNAME.EMPTY })
  @ApiProperty({ example: 'John Doe' })
  nickname: string;
}
