import { ApiProperty } from '@nestjs/swagger';
import {
  isNotEmpty,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { USER_MESSAGES } from 'src/constants/user-message.constant';

export class UserPasswordUpdateDto {
  @IsString()
  @IsStrongPassword(
    { minLength: 8, minSymbols: 1 },
    {
      message: USER_MESSAGES.USER.USERINFO.UPDATE.FAILURE.PASSWORD.WEAKPASSWORD,
    }
  )
  @IsNotEmpty({
    message: USER_MESSAGES.USER.USERINFO.UPDATE.FAILURE.PASSWORD.MODIFYEMPTY,
  })
  @ApiProperty({ example: 'Example2@' })
  modifiedPassword: string;

  @IsString()
  @IsNotEmpty({
    message: USER_MESSAGES.USER.USERINFO.UPDATE.FAILURE.PASSWORD.EMPTYNOW,
  })
  @ApiProperty({ example: 'Example1@' })
  currentPassword: string;
}
