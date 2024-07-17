import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { MoveCardDto } from './dto/move-card.dto';
import { LexoRank } from 'lexorank';
import { CARD_MESSAGES } from 'src/constants/card-message.constant';
import { BoardUser } from 'src/board/entities/board-user.entity';
import { List } from 'src/list/entities/list.entity';
import { CardUser } from './entities/card-user.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { CheckList } from 'src/checkList/entities/checkList.entity';
import { midRank } from 'src/utils/lexorank';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @InjectRepository(BoardUser)
    private readonly boardUserRepository: Repository<BoardUser>,
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
    @InjectRepository(CardUser)
    private readonly cardUserRepository: Repository<CardUser>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(CheckList)
    private readonly checkListRepository: Repository<CheckList>
  ) {}

  async createCard(userId: number, createCardDto: CreateCardDto) {
    if (!userId) {
      throw new UnauthorizedException(
        CARD_MESSAGES.CARD.COMMON.USER.UNAUTHORIZED
      );
    }

    const { title, listId } = createCardDto;
    const board = await this.listRepository.findOne({
      where: { id: listId },
    });
    const boardId = board.boardId;
    const isInvite = await this.boardUserRepository.findOne({
      where: { userId, boardId },
    });

    if (!isInvite) {
      throw new UnauthorizedException(
        CARD_MESSAGES.CARD.COMMON.USER.UNAUTHORIZED
      );
    }

    const list = await this.listRepository.findOne({
      where: { id: listId },
    });

    if (!list) {
      throw new NotFoundException(CARD_MESSAGES.CARD.CREATE.FAILURE.NOTFOUND);
    }

    if (!title) {
      throw new BadRequestException(CARD_MESSAGES.CARD.COMMON.TITLE.NO_TITLE);
    }

    // 해당 listId에 속한 마지막 카드를 조회하고, 그 카드의 cardOrder를 기준으로 새로운 순서 값을 생성합니다.
    const lastCard = await this.cardRepository.findOne({
      where: { listId },
      order: { cardOrder: 'DESC' },
    });

    // 마지막 카드가 없는 경우, LexoRank.middle()을 사용하여 초기 순서 값을 설정합니다.
    const lastRank = lastCard
      ? LexoRank.parse(lastCard.cardOrder).genNext()
      : LexoRank.middle();

    // createCardDto를 스프레드 연산자를 사용하여 newCard 객체에 할당합니다.
    // 새롭게 생성한 cardOrder 값을 newCard 객체에 포함시킵니다.
    const newCard = this.cardRepository.create({
      listId,
      ...createCardDto,
      cardOrder: lastRank.toString(),
    });

    return await this.cardRepository.save(newCard);
  }

  async findAllCards(userId: number, listId: number) {
    if (!userId) {
      throw new UnauthorizedException(
        CARD_MESSAGES.CARD.COMMON.USER.UNAUTHORIZED
      );
    }
    if (!listId) {
      throw new NotFoundException(CARD_MESSAGES.CARD.READ_CARDS.FAILURE);
    }
    return await this.cardRepository.find({
      order: { cardOrder: 'ASC' },
    });
  }

  async findCard(userId: number, cardId: number) {
    if (!userId) {
      throw new UnauthorizedException(
        CARD_MESSAGES.CARD.COMMON.USER.UNAUTHORIZED
      );
    }
    const card = await this.cardRepository.findOne({
      where: { id: cardId },
    });
    if (!card) {
      throw new NotFoundException(CARD_MESSAGES.CARD.READ_CARD.FAILURE);
    }
    const cardComment = await this.commentRepository.find({
      where: { cardId },
    });
    const cardChecklist = await this.checkListRepository.find({
      where: { cardId },
    });
    return { card, cardComment, cardChecklist };
  }

  async updateContent(
    userId: number,
    cardId: number,
    updateCardDto: UpdateCardDto
  ) {
    if (!userId) {
      throw new UnauthorizedException(
        CARD_MESSAGES.CARD.COMMON.USER.UNAUTHORIZED
      );
    }
    const card = await this.cardRepository.findOne({ where: { id: cardId } });
    if (!card) {
      throw new NotFoundException(CARD_MESSAGES.CARD.UPDATE.FAILURE);
    }

    const { title, description, color, duedate, duedate_status } =
      updateCardDto;
    if (!title) {
      throw new BadRequestException(CARD_MESSAGES.CARD.COMMON.TITLE.NO_TITLE);
    }
    return await this.cardRepository.update(
      { id: cardId },
      {
        title,
        description,
        color,
        duedate,
        duedate_status,
      }
    );
  }

  /** 카드 이동 API **/
  async moveCard(userId: number, cardId: number, moveCardDto: MoveCardDto) {
    // userId 확인
    if (!userId) {
      throw new UnauthorizedException(
        CARD_MESSAGES.CARD.COMMON.USER.UNAUTHORIZED
      );
    }

    const { listId, toPrevId, toNextId } = moveCardDto;

    const card = await this.cardRepository.findOne({
      where: { id: cardId },
    });
    if (!card) {
      throw new NotFoundException(CARD_MESSAGES.CARD.UPDATE.FAILURE);
    }

    // 해당하는 listId 찾기
    const targetList = await this.listRepository.findOne({
      where: { id: listId },
    });
    if (!targetList) {
      throw new NotFoundException(CARD_MESSAGES.CARD.READ_CARDS.FAILURE);
    }

    // prevCard와 nextCard 초기화
    let prevCard = null;
    let nextCard = null;

    // toPrevId와 toNextId가 존재할 경우 해당 id를 기반으로 카드를 찾기. 그 후 prevCard와 nextCard에 넣기.
    if (toPrevId) {
      prevCard = await this.cardRepository.findOne({ where: { id: toPrevId } });
    }

    if (toNextId) {
      nextCard = await this.cardRepository.findOne({ where: { id: toNextId } });
    }

    // prevCard와 nextCard사이의 lexorank값을 구하기
    const newCardOrder = midRank(
      prevCard ? prevCard.cardOrder : null,
      nextCard ? nextCard.cardOrder : null
    );

    // 구한 lexorank값이 newCardOrder와 입력된 listId를 card에 수정해서 넣기.
    card.listId = listId;
    card.cardOrder = newCardOrder;

    return await this.cardRepository.save(card);
  }

  async deleteCard(userId: number, cardId: number) {
    if (!userId) {
      throw new UnauthorizedException(
        CARD_MESSAGES.CARD.COMMON.USER.UNAUTHORIZED
      );
    }
    const card = await this.cardRepository.findOne({ where: { id: cardId } });
    if (!card) {
      throw new NotFoundException(CARD_MESSAGES.CARD.READ_CARD.FAILURE);
    }
    return await this.cardRepository.softDelete({ id: cardId });
  }
}
