import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { Board } from 'src/board/entities/board.entity';
import { BoardUser } from 'src/board/entities/board-user.entity';

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
  // List title, Card name, Card id, Card color(?), Card 순서(lexorank)
  async findAllLists() {
    const lists = await this.listRepository.find({
      order: { listOrder: 'ASC' },
    });

    return lists;
  }

  /** 리스트 상세 조회 API **/
  async findListById(listId: number) {
    const list = await this.listRepository.findOne({
      where: { id: listId },
    });

    if (!list) {
      throw new NotFoundException('리스트가 존재하지 않습니다.');
    }

    return list;
  }

  /** 리스트 이름 수정 API **/
  async updateList(listId: number, updateListDto: UpdateListDto) {
    // 해당하는 listId 가져오기
    const list = await this.findListById(listId);

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
  moveList(listId: number) {
    return `This action returns a #${listId} list`;
  }

  /** 리스트 삭제 API **/
  async removeList(listId: number) {
    // 해당하는 listId 가져오기
    const list = await this.findListById(listId);

    if (!list) {
      throw new NotFoundException('해당 아이디의 리스트가 존재하지 않습니다.');
    }

    const removeList = await this.listRepository.softDelete({
      id: listId,
    });

    return removeList;
  }
}
