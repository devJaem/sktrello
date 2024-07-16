import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { USER_MESSAGES } from 'src/constants/user-message.constant';

export class SignUpDto {
  @IsString()
  @IsNotEmpty({ message: USER_MESSAGES.USER.SIGNUP.EMAIL.EMPTY })
  email: string;

  @IsString()
  @IsNotEmpty({ message: USER_MESSAGES.USER.SIGNUP.PASSWORD.EMPTY })
  @IsStrongPassword(
    { minLength: 8, minSymbols: 1 },
    { message: USER_MESSAGES.USER.SIGNUP.PASSWORD.WEAKPASSWORD }
  )
  password: string;

  @IsString()
  @IsNotEmpty({ message: USER_MESSAGES.USER.SIGNUP.PASSWORD.EMPTY })
  passwordConfirm: string;

  @IsString()
  @IsNotEmpty({ message: USER_MESSAGES.USER.SIGNUP.NICKNAME.EMPTY })
  nickname: string;
}
