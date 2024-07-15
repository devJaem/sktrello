import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dtos/sign-up.dto';
import { USER_MESSAGES } from 'src/constants/user-message.constant';
import { SignInDto } from './dtos/sign-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}
  async signUp(signUpDto: SignUpDto) {
    const { email, nickname, password, passwordConfirm } = signUpDto;

    const isPasswordMatched = password === passwordConfirm;

    if (!isPasswordMatched) {
      throw new BadRequestException({
        message: USER_MESSAGES.USER.SIGNUP.PASSWORD.NOTMATCHED,
      });
    }

    const existedUser = await this.userRepository.findOneBy({ email });
    if (existedUser) {
      throw new BadRequestException({
        message: USER_MESSAGES.USER.SIGNUP.EMAIL.CONFLICT,
      });
    }
    const user = await this.userRepository.save({ email, nickname, password });
    delete user.password;
    return user;
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new BadRequestException({
        message: USER_MESSAGES.USER.SIGNIN.USER.NOTFOUND,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // 비밀번호 비교
    if (!isPasswordValid) {
      throw new BadRequestException({
        message: USER_MESSAGES.USER.SIGNIN.PASSWORD.WRONGPASSWORD,
      });
    }

    const payload = { sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
