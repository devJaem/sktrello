import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt, { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { USER_MESSAGES } from 'src/constants/user-message.constant';
import { SignUpDto } from 'src/user/dto/sign-up.dto';
import { SignInDto } from 'src/user/dto/sign-in.dto';

import { User } from './entities/user.entity';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserPasswordUpdateDto } from './dto/user-password-update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  /** 회원 가입 API **/
  async signUp(signUpDto: SignUpDto) {
    // 1. dto에서 필요한 정보 가져오기
    const { email, nickname, password, passwordConfirm } = signUpDto;

    // 2. '비밀번호', '비밀번호 확인' 일치여부
    const isPasswordMatched = password === passwordConfirm;
    if (!isPasswordMatched) {
      throw new BadRequestException({
        message: USER_MESSAGES.USER.SIGNUP.PASSWORD.NOTMATCHED,
      });
    }

    // 3. 이미 가입된 이메일인지?
    const existedUser = await this.userRepository.findOneBy({ email });
    if (existedUser) {
      throw new ConflictException({
        message: USER_MESSAGES.USER.SIGNUP.EMAIL.CONFLICT,
      });
    }

    // 4. 비밀번호 hash
    const hashedPassword = await hash(password, 10);

    // 5. 회원 가입 진행
    const user = await this.userRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });

    // 5. 반환(비밀번호는 제외하고)
    delete user.password;
    return user;
  }

  /** 로그인 API **/
  async signIn(signInDto: SignInDto) {
    // 1. dto에서 필요한 정보 받아오기
    const { email, password } = signInDto;

    // 2. 해당 유저 존재하니?
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException({
        message: USER_MESSAGES.USER.SIGNIN.USER.NOTFOUND,
      });
    }

    // 3. 비밀번호 일치하니?
    const isPasswordValid = await bcrypt.compare(password, user.password); // 비밀번호 비교
    if (!isPasswordValid) {
      throw new UnauthorizedException({
        message: USER_MESSAGES.USER.SIGNIN.PASSWORD.WRONGPASSWORD,
      });
    }

    // 4. 페이로드
    const payload = { email, sub: user.id };

    const accessToken = this.jwtService.sign(payload);

    // 5. payload로 만든 accessToken 반환
    return accessToken;
  }

  /** 회원 정보 조회 API **/
  async findUserInfo(user: User) {
    const userInfo = await this.findByEmail(user.email);
    return userInfo;
  }

  /** 회원 탈퇴 API **/
  async quit(user: User) {
    // 0. 필요한 정보
    const userId = user.id;
    const nickname = user.nickname;

    // 1. 회원 탈퇴 (소프트 삭제)
    await this.userRepository.softDelete({
      id: userId,
    });

    // 2. 반환
    const data = {
      id: userId,
      nickname: nickname,
    };
    return data;
  }

  /** email로 사용자 찾기(+) **/
  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async updateUserInfo(user: User, userUpdateDto: UserUpdateDto) {
    // 1. dto에서 필요한 정보 받아오기
    const { email, nickname } = userUpdateDto;

    //2. 유저 정보를 변경(이메일)
    if (email) {
      const isExistingEmail = await this.userRepository.findOneBy({ email });

      /** 다른 사용자가 같은 이메일을 사용하고 있으면 **/
      if (isExistingEmail && isExistingEmail.id !== user.id) {
        throw new ConflictException({
          message: USER_MESSAGES.USER.USERINFO.UPDATE.FAILURE.EMAIL.CONFLICT,
        });
      }

      user.email = email;
    }

    //3. 유저 정보를 변경(닉네임)
    if (nickname) {
      user.nickname = nickname;
    }

    const updatedUser = await this.userRepository.update(
      { id: user.id },
      userUpdateDto
    );
    return userUpdateDto;
  }

  async updateUserPassword(
    user: User,
    userPasswordUpdateDto: UserPasswordUpdateDto
  ) {
    //1. 필요한 정보를 Dto에서 받아오기
    const { currentPassword, modifiedPassword } = userPasswordUpdateDto;

    //2. 입력된 비밀번호를 해시했을 때 저장된 값과 동일한가?
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    // console.log(
    //   '비밀번호 일치여부 : ',
    //   isPasswordValid,
    //   '저장된 비밀번호(해시됨) : ',
    //   user.password,
    //   '해시된 비밀번호 : ',
    //   await hash(password, 10)
    // );

    //저장된 값과 불일치하면...
    if (!isPasswordValid) {
      throw new UnauthorizedException({
        message:
          USER_MESSAGES.USER.USERINFO.UPDATE.FAILURE.PASSWORD.NOTMATCHEDNOW,
      });
    }

    //3. 바꿀 비밀번호 해시하기
    const hashedPassword = await hash(modifiedPassword, 10);

    //4. 변경된 비밀번호 저장
    await this.userRepository.update(
      { id: user.id },
      {
        password: hashedPassword,
      }
    );

    return { success: true };
  }
}
