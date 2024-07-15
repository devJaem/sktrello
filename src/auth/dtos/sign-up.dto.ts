import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { MESSAGES } from 'src/constants/user-message.constants';

export class SignUpDto {
  @IsString()
  @IsNotEmpty({ message: MESSAGES.USER.SIGNUP.EMAIL.EMPTY })
  email: string;

  @IsString()
  @IsNotEmpty({ message: MESSAGES.USER.SIGNUP.PASSWORD.EMPTY })
  @IsStrongPassword({ minLength: 8, minSymbols: 1 }, {})
  password: string;

  @IsString()
  @IsNotEmpty({ message: MESSAGES.USER.SIGNUP.PASSWORD.EMPTY })
  passwordConfirm: string;

  @IsString()
  @IsNotEmpty({ message: MESSAGES.USER.SIGNUP.NICKNAME.EMPTY })
  nickname: string;
}
