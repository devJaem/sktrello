import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { MoveCardDto } from './dto/move-card.dto';
import { LexoRank } from 'lexorank';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>
  ) {}

  async create(createCardDto: CreateCardDto): Promise<Card> {
    const cards = await this.cardRepository.find({
      order: { cardOrder: 'ASC' },
    });
    const lastCard = cards[cards.length - 1];
    const lastRank = lastCard
      ? LexoRank.parse(lastCard.cardOrder)
      : LexoRank.min();

    const newCard = this.cardRepository.create({
      ...createCardDto,
      cardOrder: lastRank.genNext().toString(),
    });

    return await this.cardRepository.save(newCard);
  }

  async findAll(): Promise<Card[]> {
    return await this.cardRepository.find();
  }

  async findOne(id: number): Promise<Card> {
    return await this.cardRepository.findOneBy({ id });
  }

  async updateContent(id: number, updateCardDto: UpdateCardDto): Promise<Card> {
    const card = await this.cardRepository.findOneBy({ id });
    if (!card) {
      throw new NotFoundException('Card not found');
    }

    Object.assign(card, updateCardDto);
    return await this.cardRepository.save(card);
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

    const previousCard = cards[newOrder - 1];
    const nextCard = cards[newOrder];

    let newRank: LexoRank;
    if (previousCard && nextCard) {
      const prevRank = LexoRank.parse(previousCard.cardOrder);
      const nextRank = LexoRank.parse(nextCard.cardOrder);
      newRank = prevRank.between(nextRank);
    } else if (previousCard) {
      const prevRank = LexoRank.parse(previousCard.cardOrder);
      newRank = prevRank.genNext();
    } else if (nextCard) {
      const nextRank = LexoRank.parse(nextCard.cardOrder);
      newRank = nextRank.genPrev();
    } else {
      newRank = LexoRank.min();
    }

    card.cardOrder = newRank.toString();
    card.listId = listId;
    return await this.cardRepository.save(card);
  }

  async remove(id: number): Promise<void> {
    await this.cardRepository.softDelete(id);
  }
}
