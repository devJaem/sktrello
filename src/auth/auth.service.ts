import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dtos/sign-up.dto';
import { MESSAGES } from 'src/constants/user-message.constants';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}
  async signUp(signUpDto: SignUpDto) {
    const { email, nickname, password, passwordConfirm } = signUpDto;

    const isPasswordMatched = password === passwordConfirm;

    if (!isPasswordMatched) {
      throw new BadRequestException({
        message: MESSAGES.USER.SIGNUP.PASSWORD.NOTMATCHED,
      });
    }

    const existedUser = await this.userRepository.findOneBy({ email });
    if (existedUser) {
      throw new BadRequestException({
        message: MESSAGES.USER.SIGNUP.EMAIL.CONFLICT,
      });
    }
    const user = await this.userRepository.save({ email, nickname, password });
    delete user.password;
    return user;
  }
}
