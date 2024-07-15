import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dtos/sign-up.dto';
import { MESSAGES } from 'src/constants/message.constants';

@Injectable()
export class AuthService {
  async signUp(signUpDto: SignUpDto) {
    const { password, passwordConfirm } = signUpDto;

    const isPasswordMatched = password === passwordConfirm;

    if (!isPasswordMatched) {
      throw new BadRequestException({
        message: MESSAGES.USER.SIGNUP.PASSWORD.NOTMATCHED,
      });
    }
  }
}
