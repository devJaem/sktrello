import { BoardUserRole } from 'src/board/types/board-user.type';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // 가드
import { Reflector } from '@nestjs/core';

import { InjectRepository } from '@nestjs/typeorm';
import { BoardUser } from 'src/board/entities/board-user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardUserRolesGuard
  extends AuthGuard('jwt')
  implements CanActivate
{
  // extends AuthGuard('jwt'): 로그인이 기본적으로 된 상황에서 가겠다는 뜻
  constructor(
    private reflector: Reflector,

    @InjectRepository(BoardUser)
    private readonly boardUserRepository: Repository<BoardUser>
  ) {
    super(); // 부모class 거 가져오기
  }

  // canActivate: 너는 허용이 된다/안된다 판단해주는 역할
  // context: ExecutionContext : 실행컨텍스트 타입으로 된 컨텍스트
  async canActivate(context: ExecutionContext) {
    // 1. 인증이 된 상태인가?
    const authenticated = await super.canActivate(context);
    // 1-1. 인증이 되지 않은 상태라면 false
    if (!authenticated) {
      return false;
    }

    // 우리가 데코레이터 쓸 형식: @BoardUserRoles(boardUserRole.host, boardUserRole.admin, boardUserRole.member)
    // 우리가 비교할 메타데이터 형식: { boardUserRoles: [BoardUserRole.host],.. } (권한가진 role들을 요소로 가지는 배열)
    // 2. reflector를 사용하여 boardUserRoles 키를 가진 메타데이터 읽기 [Role.ADMIN]
    const requiredBoardUserRoles = this.reflector.getAllAndOverride<
      BoardUserRole[]
    >('boardUserRoles', [context.getHandler(), context.getClass()]);
    // 2-1. requiredBoardUserRoles가 없다 = boardUserRole이 지정되지 않았다.
    // 예시> 딱히 boardUserRole 제한 없이 할 수 있는 API는 boardUserRole 지정을 하지 않았을 것이니까... 이런 경우
    if (!requiredBoardUserRoles) {
      return true;
    }
    // 2-2. requiredBoardUserRoles가 있다 = boardUserRole이 지정되어 있다.
    // 예시> boardUserRole 제한이 있는(예를 들어 admin만 할 수 있는) API를 실행하려는 경우

    // 3. 그렇다면 사용자가 권한 지정된 boardUserRole이 맞는지 확인해야함
    // 3-1. request 정보 가져오기
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userId = user.id;
    const boardId = request.params.boardId;

    // 3-2. BoardUserRole 가져오기
    const userBoardUserRole = await this.boardUserRepository.findOne({
      where: {
        userId,
        boardId,
      },
    });

    // 3-3. some: 여기에 해당하는 게 맞니? => 맞으면 true, 아니면 false 반환
    return requiredBoardUserRoles.some(
      (boardUserRole) => userBoardUserRole.boardUserRole === boardUserRole
    );
  }
}
