import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
        CARD_MESSAGES.CARD.COMMON.USER.UNAUTHORIZED
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

    const cards = await this.cardRepository.find({
      order: { cardOrder: 'ASC' },
    });
    const lastCard = cards[cards.length - 1];
    const lastRank = lastCard
      ? LexoRank.parse(lastCard.cardOrder)
      : LexoRank.min();

    await this.cardRepository.create({
      ...createCardDto,
      cardOrder: lastRank.genNext().toString(),
    });

    return await this.cardRepository.save({
      listId,
      title,
      description,
      color,
      duedate,
      duedate_status,
    });
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

  async updateOrderAndList(
    id: number,
    moveCardDto: MoveCardDto
  ): Promise<Card> {
    const { listId, cardOrder } = moveCardDto;
    const card = await this.cardRepository.findOneBy({ id });
    if (!card) {
      throw new NotFoundException('Card not found');
    }

    const cards = await this.cardRepository.find({
      where: { listId },
      order: { cardOrder: 'ASC' },
    });

    // const previousCard = cards[newOrder - 1];
    // const nextCard = cards[newOrder];

    // let newRank: LexoRank;
    // if (previousCard && nextCard) {
    //   const prevRank = LexoRank.parse(previousCard.cardOrder);
    //   const nextRank = LexoRank.parse(nextCard.cardOrder);
    //   newRank = prevRank.between(nextRank);
    // } else if (previousCard) {
    //   const prevRank = LexoRank.parse(previousCard.cardOrder);
    //   newRank = prevRank.genNext();
    // } else if (nextCard) {
    //   const nextRank = LexoRank.parse(nextCard.cardOrder);
    //   newRank = nextRank.genPrev();
    // } else {
    //   newRank = LexoRank.min();
    // }

    // card.cardOrder = newRank.toString();
    card.listId = listId;
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
