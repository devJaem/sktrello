import { SetMetadata } from '@nestjs/common';
import { BoardUserRole } from 'src/board/types/board-user.type';

// Roles 데코레이터가 여러 role들을 받을 수 있게 배열로!
export const BoardUserRoles = (...boardUserRoles: BoardUserRole[]) =>
  SetMetadata('boardUserRoles', boardUserRoles);
// roles라는 key에 받아온 roles 배열을 value로 저장 (Map 처럼)
