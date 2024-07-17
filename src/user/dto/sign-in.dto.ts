import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { USER_MESSAGES } from 'src/constants/user-message.constant';

export class SignInDto {
  @IsString()
  @IsNotEmpty({ message: USER_MESSAGES.USER.SIGNIN.EMAIL.EMPTY })
  @ApiProperty({ example: 'example@sample.com' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: USER_MESSAGES.USER.SIGNIN.PASSWORD.EMPTY })
  @ApiProperty({ example: 'Example1!' })
  password: string;
}
