import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { USER_MESSAGES } from 'src/constants/user-message.constant';

export class UserPasswordUpdateDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty({
    message: USER_MESSAGES.USER.USERINFO.UPDATE.FAILURE.PASSWORD.EMPTYNOW,
  })
  @IsStrongPassword(
    { minLength: 8, minSymbols: 1 },
    {
      message: USER_MESSAGES.USER.USERINFO.UPDATE.FAILURE.PASSWORD.WEAKPASSWORD,
    }
  )
  @ApiProperty({ example: 'Example1@' })
  password: string;

  @IsString()
  @IsNotEmpty({
    message: USER_MESSAGES.USER.USERINFO.UPDATE.FAILURE.PASSWORD.EMPTYNOW,
  })
  @ApiProperty({ example: 'Modify!@' })
  passwordConfirm: string;
}
