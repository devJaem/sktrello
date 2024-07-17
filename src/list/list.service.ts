import { Injectable, NotFoundException } from '@nestjs/common';
import { List } from './entities/list.entity';
import { Board } from 'src/board/entities/board.entity';
import { BoardUser } from 'src/board/entities/board-user.entity';
import { Card } from 'src/card/entities/card.entity';
import { CardService } from 'src/card/card.service';
import { LIST_MESSAGES } from 'src/constants/list-message.constant';
import { BOARD_MESSAGES } from 'src/constants/board-message.constant';

import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { MoveListDto } from './dto/move-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    private readonly boardUserRepository: Repository<BoardUser>,
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    private readonly cardService: CardService
  ) {}

  /** 리스트 생성 API **/
  async createList(boardId: number, createListDto: CreateListDto) {
    const { title } = createListDto;

    // 해당 id의 Board 있는지 확인
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
    });
    if (!board) {
      throw new NotFoundException(
        BOARD_MESSAGES.BOARD.READ_DETAIL.FAILURE.NOTFOUND
      );
    }

    // 리스트가 생성될 위치 지정
    const lastList = await this.listRepository.findOne({
      where: { boardId },
      order: { listOrder: 'DESC' },
    });

    // List 생성 시 새로운 리스트가 어느 위치에 삽입될지 결정
    // 이전/이후 listId 기반으로 새로운 newRank 값 생성
    const newRank = midRank(lastList ? lastList.listOrder : null, null);

    // 리스트 생성!!!
    const createList = await this.listRepository.create({
      board,
      title,
      listOrder: newRank,
    });
    const newList = await this.listRepository.save(createList);

    return newList;
  }

  /** 리스트 조회 API **/
  async findAllLists(boardId: number) {
    // 해당 보드에 존재하는 모든 list 조회
    const data = await this.listRepository.find({
      where: { boardId },
      order: { listOrder: 'ASC' },
    });
    // listId 뽑아오기
    const listIds = data.map((e: List) => e.id);

    // 리스트 상세조회 API를 개별실행
    const lists = await Promise.all(
      listIds.map(async (v: number) => {
        const list = await this.findListById(v);
        return list;
      })
    );

    // 반환
    return lists;
  }

  /** 리스트 상세 조회 API **/
  async findListById(listId: number) {
    // 선택된 리스트 가져와!
    const list = await this.listRepository.findOne({
      where: { id: listId },
    });
    if (!list) {
      throw new NotFoundException(LIST_MESSAGES.LIST.READ_LIST.FAILURE);
    }

    // 그 리스트에 달린 카드(제목+정렬순서) 가져와!
    const cards = await this.cardService.findCardTitle(listId);
    return {
      listInfo: list,
      cards: cards,
    };
  }

  /** 리스트 이름 수정 API **/
  async updateList(listId: number, updateListDto: UpdateListDto) {
    // 해당하는 listId 가져오기
    const list = await this.listRepository.findOne({
      where: {
        id: listId,
      },
    });
    if (!list) {
      throw new NotFoundException(LIST_MESSAGES.LIST.READ_DETAIL.FAILURE);
    }
    const { title } = updateListDto;

    // 수정
    await this.listRepository.update({ id: listId }, { title });

    // 반환
    const updateList = {
      before: list.title,
      after: updateListDto.title,
    };
    return updateList;
  }

  /** 리스트 순서 이동 API **/
  async moveList(listId: number, moveListDto: MoveListDto) {
    // 해당하는 listId 가져오기
    const list = await this.listRepository.findOne({
      where: {
        id: listId,
      },
    });

    if (!list) {
      throw new NotFoundException(LIST_MESSAGES.LIST.READ_DETAIL.FAILURE);
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
  async removeList(listId: number) {
    // 해당하는 listId 가져오기
    const list = await this.listRepository.findOne({
      where: {
        id: listId,
      },
    });

    if (!list) {
      throw new NotFoundException(LIST_MESSAGES.LIST.READ_DETAIL.FAILURE);
    }

    await this.listRepository.softDelete({
      id: listId,
    });

    const removeList = {
      id: list.id,
      title: list.title,
    };

    return removeList;
  }
}
