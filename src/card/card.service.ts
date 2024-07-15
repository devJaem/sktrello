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
import { CARDMESSAGES } from 'src/constants/card-message.constant';
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

  async createCard(
    userId: number,
    listId: number,
    createCardDto: CreateCardDto
  ) {
    if (!userId) {
      throw new UnauthorizedException(
        CARDMESSAGES.CARD.COMMON.USER.UNAUTHORIZED
      );
    }

    const { title, description, color, duedate, duedate_status } =
      createCardDto;
    const board = await this.listRepository.findOne({
      where: { id: listId },
    });
    const boardId = board.boardId;
    const isInvite = await this.boardUserRepository.findOne({
      where: { userId, boardId },
    });

    if (!isInvite) {
      throw new UnauthorizedException(
        CARDMESSAGES.CARD.COMMON.USER.UNAUTHORIZED
      );
    }

    const list = await this.listRepository.findOne({
      where: { id: listId },
    });

    if (!list) {
      throw new NotFoundException(CARDMESSAGES.CARD.CREATE.FAILURE.NOTFOUND);
    }

    if (!title) {
      throw new BadRequestException(CARDMESSAGES.CARD.COMMON.TITLE.NO_TITLE);
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
        CARDMESSAGES.CARD.COMMON.USER.UNAUTHORIZED
      );
    }
    if (!listId) {
      throw new NotFoundException(CARDMESSAGES.CARD.READ_CARDS.FAILURE);
    }
    return await this.cardRepository.find({
      order: { cardOrder: 'ASC' },
    });
  }

  async findCard(userId: number, cardId: number) {
    if (!userId) {
      throw new UnauthorizedException(
        CARDMESSAGES.CARD.COMMON.USER.UNAUTHORIZED
      );
    }
    const card = await this.cardRepository.findOne({
      where: { id: cardId },
    });
    if (!card) {
      throw new NotFoundException(CARDMESSAGES.CARD.READ_CARD.FAILURE);
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
        CARDMESSAGES.CARD.COMMON.USER.UNAUTHORIZED
      );
    }
    const card = await this.cardRepository.findOne({ where: { id: cardId } });
    if (!card) {
      throw new NotFoundException(CARDMESSAGES.CARD.UPDATE.FAILURE);
    }

    const { title, description, color, duedate, duedate_status } =
      updateCardDto;
    if (!title) {
      throw new BadRequestException(CARDMESSAGES.CARD.COMMON.TITLE.NO_TITLE);
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

  async moveCard(userId: number, cardId: number, moveCardDto: MoveCardDto) {
    // userId 확인
    if (!userId) {
      throw new UnauthorizedException(
        CARDMESSAGES.CARD.COMMON.USER.UNAUTHORIZED
      );
    }

    const { listId, cardOrder } = moveCardDto;

    const card = await this.cardRepository.findOne({ where: { id: cardId } });
    if (!card) {
      throw new NotFoundException(CARDMESSAGES.CARD.UPDATE.FAILURE);
    }

    // 해당하는 listId 찾기
    const targetList = await this.listRepository.findOne({
      where: { id: listId },
    });
    if (!targetList) {
      throw new NotFoundException(CARDMESSAGES.CARD.READ_CARDS.FAILURE);
    }

    // 이동하려는 카드의 순서보다 작은 (즉, 앞에 있는) 카드를 찾아 그중 가장 큰 순서를 가진 카드를 넣는다.
    const prevCard = await this.cardRepository.findOne({
      where: { listId, cardOrder: LessThan(cardOrder) },
      order: { cardOrder: 'DESC' },
    });

    // 이동하려는 카드의 순서보다 큰 (즉, 뒤에 있는) 카드를 찾아 그중 가장 작은 순서를 가진 카드를 넣는다.
    const nextCard = await this.cardRepository.findOne({
      where: { listId, cardOrder: MoreThan(cardOrder) },
      order: { cardOrder: 'ASC' },
    });

    // midRank로직 사용하여 update 할 카드 lexorank 생성
    const newCardOrder = midRank(
      prevCard ? prevCard.cardOrder : null,
      nextCard ? nextCard.cardOrder : null
    );

    card.listId = listId;
    card.cardOrder = newCardOrder;

    return await this.cardRepository.save(card);
  }

  async deleteCard(userId: number, cardId: number) {
    if (!userId) {
      throw new UnauthorizedException(
        CARDMESSAGES.CARD.COMMON.USER.UNAUTHORIZED
      );
    }
    const card = await this.cardRepository.findOne({ where: { id: cardId } });
    if (!card) {
      throw new NotFoundException(CARDMESSAGES.CARD.READ_CARD.FAILURE);
    }
    return await this.cardRepository.softDelete({ id: cardId });
  }
}
