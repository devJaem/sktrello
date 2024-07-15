import { IsNotEmpty, IsString } from 'class-validator';
import { MESSAGES } from 'src/constants/user-message.constants';

export class SignInDto {
  @IsString()
  @IsNotEmpty({ message: MESSAGES.USER.SIGNIN.EMAIL.EMPTY })
  email: string;

  @IsString()
  @IsNotEmpty({ message: MESSAGES.USER.SIGNIN.PASSWORD.EMPTY })
  password: string;
}
