import { IsNotEmpty, IsString } from 'class-validator';
import { USER_MESSAGES } from 'src/constants/user-message.constant';

export class SignInDto {
  @IsString()
  @IsNotEmpty({ message: USER_MESSAGES.USER.SIGNIN.EMAIL.EMPTY })
  email: string;

  @IsString()
  @IsNotEmpty({ message: USER_MESSAGES.USER.SIGNIN.PASSWORD.EMPTY })
  password: string;
}
