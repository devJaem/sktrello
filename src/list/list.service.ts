import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { MoveListDto } from './dto/move-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { Board } from 'src/board/entities/board.entity';
import { BoardUser } from 'src/board/entities/board-user.entity';
import { midRank } from 'src/utils/lexorank';

@Injectable()
export class ListService {
  // 의존성 주입
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(BoardUser)
    private readonly boardUserRepository: Repository<BoardUser>
  ) {}

  /** 리스트 생성 API **/
  async createList(userId: number, createListDto: CreateListDto) {
    // 인증된 사용자 여부 확인
    if (!userId) {
      throw new UnauthorizedException('인증된 사용자가 아닙니다.');
    }

    const { boardId, title } = createListDto;

    // 초대된 member인지 확인
    const inviteMember = await this.boardUserRepository.findOne({
      where: { userId, boardId },
    });

    if (!inviteMember) {
      throw new UnauthorizedException('해당 보드에 권한이 없습니다.');
    }

    // 해당 id의 Board 있는지 확인
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
    });

    if (!board) {
      throw new NotFoundException('해당하는 보드가 존재하지 않습니다.');
    }

    const createList = await this.listRepository.save({
      board,
      title,
    });

    return createList;
  }

  /** 리스트 조회 API **/
  // 해당 list에 있는 card 정보 가져오기 - title, duedate, color, card_order(lexorank)
  async findAllLists(userId: number) {
    // 인증된 사용자 여부 확인
    if (!userId) {
      throw new UnauthorizedException('인증된 사용자가 아닙니다.');
    }

    const lists = await this.listRepository.find({
      order: { listOrder: 'ASC' },
    });

    return lists;
  }

  /** 리스트 상세 조회 API **/
  // 해당 list에 있는 card 정보 가져오기 - title, duedate, color, card_order(lexorank)
  async findListById(userId: number, listId: number) {
    // 인증된 사용자 여부 확인
    if (!userId) {
      throw new UnauthorizedException('인증된 사용자가 아닙니다.');
    }

    const list = await this.listRepository.findOne({
      where: { id: listId },
    });

    if (!list) {
      throw new NotFoundException('리스트가 존재하지 않습니다.');
    }

    return list;
  }

  /** 리스트 이름 수정 API **/
  async updateList(
    userId: number,
    listId: number,
    updateListDto: UpdateListDto
  ) {
    // 인증된 사용자 여부 확인
    if (!userId) {
      throw new UnauthorizedException('인증된 사용자가 아닙니다.');
    }

    // 해당하는 listId 가져오기
    const list = await this.findListById(userId, listId);

    if (!list) {
      throw new NotFoundException('해당 아이디의 리스트가 존재하지 않습니다.');
    }

    const { title } = updateListDto;

    const updateList = await this.listRepository.update(
      { id: listId },
      { title }
    );

    return updateList;
  }

  /** 리스트 순서 이동 API **/
  async moveList(userId: number, listId: number, moveListDto: MoveListDto) {
    // 인증된 사용자 여부 확인
    if (!userId) {
      throw new UnauthorizedException('인증된 사용자가 아닙니다.');
    }

    // 해당하는 listId 가져오기
    const list = await this.findListById(userId, listId);

    if (!list) {
      throw new NotFoundException('해당 아이디의 리스트가 존재하지 않습니다.');
    }

    const { toPrevId, toNextId } = moveListDto;

    // 순서 이동 후 위치할 이전/이후 list 조회
    const prevList = toPrevId
      ? await this.listRepository.findOneBy({ id: toPrevId })
      : null;
    const nextList = toNextId
      ? await this.listRepository.findOneBy({ id: toNextId })
      : null;

    // 이전/이후 list의 lexorank 값 기반으로 새로운 newRank 값 생성
    const newRank = midRank(
      prevList ? prevList.listOrder : null,
      nextList ? nextList.listOrder : null
    );

    // 이동할 list의 lexorank 값을 새로운 newRank 값으로 변경
    list.listOrder = newRank;

    const moveList = await this.listRepository.save(list);

    return moveList;
  }

  /** 리스트 삭제 API **/
  async removeList(userId: number, listId: number) {
    // 인증된 사용자 여부 확인
    if (!userId) {
      throw new UnauthorizedException('인증된 사용자가 아닙니다.');
    }

    // 해당하는 listId 가져오기
    const list = await this.findListById(userId, listId);

    if (!list) {
      throw new NotFoundException('해당 아이디의 리스트가 존재하지 않습니다.');
    }

    const removeList = await this.listRepository.softDelete({
      id: listId,
    });

    return removeList;
  }
}
