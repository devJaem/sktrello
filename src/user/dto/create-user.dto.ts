import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class SingUpDto extends PickType(User, [
  'email',
  'nickname',
  'password',
]) {
  passwordConfirm: String;
}
