import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { USER_MESSAGES } from 'src/constants/user-message.constant';

import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { LogIn } from 'src/auth/decorator/login.decorator';
import { SignUpDto } from 'src/user/dto/sign-up.dto';
import { SignInDto } from 'src/user/dto/sign-in.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('1. 사용자 API')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** 회원 가입 API **/
  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    const data = await this.userService.signUp(signUpDto);
    return {
      status: HttpStatus.CREATED,
      message: USER_MESSAGES.USER.SIGNUP.SUCCESS,
      data: data,
    };
  }

  /** 로그인 API **/
  @Post('/sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    const data = await this.userService.signIn(signInDto);
    return {
      status: HttpStatus.OK,
      message: USER_MESSAGES.USER.SIGNIN.SUCCESS,
      data: data,
    };
  }

  /** 회원 정보 조회 API **/
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('me')
  async findUserInfo(@LogIn() user: User) {
    const data = await this.userService.findUserInfo(user);
    return {
      status: HttpStatus.OK,
      message: USER_MESSAGES.USER.USERINFO.READ.SUCCESS,
      data: data,
    };
  }
}
