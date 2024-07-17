import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ListService } from 'src/list/list.service';

import { BOARD_MESSAGES } from 'src/constants/board-message.constant';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InviteBoardMemberDto } from './dto/invite-board-member.dto';

import { Board } from './entities/board.entity';
import { BoardUser } from './entities/board-user.entity';
import { BoardUserRole } from './types/board-user.type';
import { User } from 'src/user/entities/user.entity';
import { BoardAuthDto } from './dto/board-auth.dto';

@Injectable()
export class BoardService {
  /** 의존성 주입 **/
  constructor(
    // 트랜잭션을 위한 준비!
    private dataSource: DataSource,

    private readonly listService: ListService,

    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,

    @InjectRepository(BoardUser)
    private readonly boardUserRepository: Repository<BoardUser>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  /** Board 생성(C) API **/
  async createBoard(user: User, createBoardDto: CreateBoardDto) {
    // 0. 로그인한 사용자 id 가져오기
    const userId = user.id;

    // 1. board 생성 + boardUser 데이터 생성
    // 1-1. 트랜잭션 시작
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    // 1-2. 트랜잭션 묶기
    // : try(트랜잭션 묶음) - catch(에러=롤백)
    try {
      // 1-2-1. 전달받은 데이터로 board 생성
      const board = await queryRunner.manager.save(Board, createBoardDto);
      // 1-2-2. boardUser 데이터도 생성
      await queryRunner.manager.save(BoardUser, {
        boardId: board.id,
        userId: userId,
        boardUserRole: BoardUserRole.host,
        isAccepted: true,
      });

      // 1-3-성공시 **********
      // 1-3-성공시-1. 트랜잭션 commit
      await queryRunner.commitTransaction();
      // 1-3-성공시-2. 커밋 된 트랜잭션 release
      await queryRunner.release();
      // 1-3-성공시-3. 생성된 board의 id와 title을 controller에 전달
      return {
        id: board.id,
        title: board.title,
      };
    } catch (err) {
      // 1-3-실패시 **********
      // 1-3-실패시-1. 롤백하기
      await queryRunner.rollbackTransaction();
      // 1-3-실패시-2. 롤백 된 트랜잭션 release
      await queryRunner.release();
      // 1-3-실패시-3. 에러 처리
      throw new InternalServerErrorException(
        BOARD_MESSAGES.BOARD.CREATE.FAILURE
      );
    }
  }

  /** Board 목록 조회(R-L) **/
  async findAllBoard(user: User) {
    // 0. 로그인한 사용자 id 가져오기
    const userId = user.id;

    // 1. 사용자가 host로 참여하는 board 목록 조회
    const hostBoards = await this.boardRepository.find({
      where: {
        boardUsers: {
          userId: userId,
          boardUserRole: BoardUserRole.host,
        },
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    // 2. 사용자가 admin로 참여하는 board 목록 조회
    const adminBoards = await this.boardRepository.find({
      where: {
        boardUsers: {
          userId: userId,
          boardUserRole: BoardUserRole.admin,
        },
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    // 3. 사용자가 admin로 참여하는 board 목록 조회
    const memberBoards = await this.boardRepository.find({
      where: {
        boardUsers: {
          userId: userId,
          boardUserRole: BoardUserRole.member,
        },
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    // 4. 반환
    return {
      asHost: hostBoards,
      asAdmin: adminBoards,
      asMember: memberBoards,
    };
  }

  /** Board 상세 조회(R-D) **/ // 핵심기능!! - 보드 하위의 List 당겨오기!! **********
  // 다른 사람들 파일 합친 내용이 필요함 *************** 수정 필요 ******************
  async findOneBoard(user: User, boardId: number) {
    // 0. 로그인한 사용자 id 가져오기
    const userId: number = user.id;

    // 1. 대상 확인 : 해당 board가 존재하는지?
    // 1-1. 해당 board 정보 가져오기
    const board = await this.boardRepository.findOne({
      where: {
        id: boardId,
      },
    });
    // 1-2. 만약 board가 존재하지 않는 경우 에러처리
    if (!board) {
      throw new NotFoundException(
        BOARD_MESSAGES.BOARD.READ_DETAIL.FAILURE.NOTFOUND
      );
    }

    // 2. 권한 확인 : 로그인한 사용자가 초대를 수락한 사용자인지?
    // 2-1. boardUser 정보 조회하기
    const boardUser = await this.boardUserRepository.findOne({
      where: {
        boardId,
        userId,
      },
    });
    // 2-2. 초대를 수락을 하지 않은 상태라면 에러처리
    if (boardUser.isAccepted == false) {
      throw new UnauthorizedException(
        BOARD_MESSAGES.BOARD.READ_DETAIL.FAILURE.UNAUTHORIZED
      );
    }

    // 3. 해당 board에 소속된 list 목록 가져오기 ***** 채은님이 만든 함수명으로 교체해야함! *****
    // const lists = await this.listService.findAll(user, boardId);
    const lists = '테스트 성공'; // 임시

    // 4. 조회된 내용을 controller에 전달
    return lists;
  }

  /** Board 수정(U) API **/
  async updateBoard(
    user: User,
    boardId: number,
    updateBoardDto: UpdateBoardDto
  ) {
    // 1. 수정 대상 확인
    // 1-1. 해당 board가 있는지
    const isExistingBoard: Board = await this.boardRepository.findOne({
      where: {
        id: boardId,
      },
    });
    // 1-2. 해당 board가 없다면 에러처리
    if (!isExistingBoard) {
      throw new NotFoundException(BOARD_MESSAGES.BOARD.DELETE.FAILURE.NOTFOUND);
    }

    // 2. board 수정하기
    await this.boardRepository.update({ id: boardId }, updateBoardDto);

    // 3. 수정된 내용을 controller에 전달
    return {
      before: {
        title: isExistingBoard.title,
        color: isExistingBoard.color,
      },
      after: {
        title: updateBoardDto.title
          ? updateBoardDto.title
          : isExistingBoard.title,
        color: updateBoardDto.color
          ? updateBoardDto.color
          : isExistingBoard.color,
      },
    };
  }

  /** Board 삭제(D) API **/
  async softDeleteBoard(user: User, boardId: number) {
    // 1. 삭제 대상 확인
    // 1-1. 해당 board가 있는지
    const isExistingBoard: Board = await this.boardRepository.findOne({
      where: {
        id: boardId,
      },
    });
    // 1-2. 해당 board가 없다면 에러처리
    if (!isExistingBoard) {
      throw new NotFoundException(BOARD_MESSAGES.BOARD.DELETE.FAILURE.NOTFOUND);
    }

    // 2. board 소프트 삭제하기
    await this.boardRepository.softDelete({
      id: boardId,
    });

    // 3. 삭제된 board의 id와 title을 controller에 전달
    return {
      id: isExistingBoard.id,
      title: isExistingBoard.title,
    };
  }

  /** Board 멤버 초대(Invite) API **/
  async inviteBoardMember(
    user: User,
    boardId: number,
    inviteBoardMemberDto: InviteBoardMemberDto
  ) {
    // 1. 초대 대상 확인 : 초대 대상 사용자가 존재하는가?
    // 1-1. email로 사용자 정보 조회
    const isExistingEmail: User = await this.userRepository.findOne({
      where: {
        email: inviteBoardMemberDto.email,
      },
    });
    // 1-2. 초대 대상 사용자가 존재하지 않는다면 에러처리
    if (!isExistingEmail) {
      throw new NotFoundException(
        BOARD_MESSAGES.BOARD.INVITATION.FAILURE.NOTFOUND
      );
    }

    // 2. 멤버 확인 : 이미 해당 보드에 초대된 사용자인가?
    // 2-1. userId로 boardUser 조회
    const isInvited: BoardUser = await this.boardUserRepository.findOne({
      where: {
        userId: isExistingEmail.id,
        boardId: boardId,
      },
    });
    // 2-2. 이미 초대한 사용자라면 에러처리
    if (isInvited) {
      throw new ConflictException(
        BOARD_MESSAGES.BOARD.INVITATION.FAILURE.CONFLICT
      );
    }

    // 3. 초대하기
    await this.boardUserRepository.save({
      boardId,
      userId: isExistingEmail.id,
    });

    // 4. 초대 대상자의 nickname과 email을 controller에 전달
    return {
      nickname: isExistingEmail.nickname,
      email: isExistingEmail.email,
    };
  }

  /** Board 초대 수락(U) API **/
  async acceptInvitation(user: User, boardId: number) {
    // 0. 로그인한 사용자 id 가져오기
    const userId: number = user.id;

    // 1. 초대된 상태인지 확인
    // 1-1. boardUser 조회
    const isInvited = await this.boardUserRepository.findOne({
      where: {
        userId,
        boardId,
      },
    });
    // 1-2. 초대된 상태가 아니라면 에러처리
    if (!isInvited) {
      throw new NotFoundException(
        BOARD_MESSAGES.BOARD.ACCEPT_INVITATION.FAILURE.NOT_INVITED
      );
    }

    // 2. 초대 수락
    await this.boardUserRepository.update(
      {
        userId,
        boardId,
      },
      {
        isAccepted: true,
        boardUserRole: BoardUserRole.member,
      }
    );

    // 3. 결과를 반환
    const data = {
      boardId: boardId,
      isAccepted: true,
      before: BoardUserRole.guest,
      after: BoardUserRole.member,
    };
    return data;
  }

  /** Board 초대 거절(D) API **/
  async declineInvitation(user: User, boardId: number) {
    // 0. 로그인한 사용자 id 가져오기
    const userId: number = user.id;

    // 1. 초대된 상태인지 확인
    // 1-1. boardUser 조회
    const isInvited = await this.boardUserRepository.findOne({
      where: {
        userId,
        boardId,
      },
    });
    // 1-2. 초대된 상태가 아니라면 에러처리
    if (!isInvited) {
      throw new NotFoundException(
        BOARD_MESSAGES.BOARD.DECLINE_INVITATION.FAILURE.NOT_INVITED
      );
    }

    // 2. 초대 거절
    await this.boardUserRepository.delete({
      userId,
      boardId,
    });

    // 3. 결과를 반환
    const data = {
      boardId: boardId,
    };
    return data;
  }

  /** Board 참여자 권한 변경(U) API **/
  async changeBoardAuth(
    user: User,
    boardId: number,
    boardAuthDto: BoardAuthDto
  ) {
    // 1. 로그인한 사용자 id 가져오기, dto 내용 가져오기
    const userId: number = user.id; // 로그인 중인 사람 아이디
    const memberId: number = boardAuthDto.userId; // 권한 변경 대상자 아이디
    const wantedRole: BoardUserRole = boardAuthDto.boardUserRole;

    // 2. 변경 대상 확인 : 대상자가 해당 board의 참여자인가?
    // 2-1. boardUser 정보 가져오기
    const isParticipated: BoardUser = await this.boardUserRepository.findOne({
      where: {
        boardId,
        userId: memberId,
      },
    });
    // 2-2. 참여자가 아니라면 에러처리
    if (!isParticipated) {
      throw new NotFoundException(
        BOARD_MESSAGES.BOARD.BOARD_AUTH.FAILURE.NOT_MEMBER
      );
    }

    // 3. 권한 변경
    // 3-1. 만약 지정한 롤이 host인 경우
    if (wantedRole == BoardUserRole.host) {
      // 3-1-1. 대상자에게 host 권한을 넘겨줌
      await this.boardUserRepository.update(
        {
          userId: memberId,
          boardId: boardId,
        },
        {
          boardUserRole: BoardUserRole.host,
        }
      );
      // 3-1-2. 자기 자신은 admin 으로 강등
      await this.boardUserRepository.update(
        {
          userId,
          boardId,
        },
        {
          boardUserRole: BoardUserRole.admin,
        }
      );
      // 3-1-3. 결과 반환
      const data = {
        memberId: memberId,
        message: BOARD_MESSAGES.BOARD.BOARD_AUTH.SUCCESS.HOST_CHANGE,
      };
      return data;
    }
    // 3-2. 만약 지정한 롤이 host가 아닌 경우
    // 3-2-1. 권한 변경 진행
    await this.boardUserRepository.update(
      {
        userId: memberId,
        boardId: boardId,
      },
      {
        boardUserRole: wantedRole,
      }
    );
    // 3-2-2. 결과 반환
    const data = {
      memberId: memberId,
      message: `${wantedRole}로 변경되었습니다.`,
    };
    return data;
  }

  /** boardId로 board 찾기 **/
  async findBoardByBoardId(boardId: number) {
    const board: Board = await this.boardRepository.findOne({
      where: {
        id: boardId,
      },
    });

    return board;
  }
}
