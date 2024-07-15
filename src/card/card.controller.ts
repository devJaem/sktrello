import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { MoveCardDto } from './dto/move-card.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/utils/test-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CARD_MESSAGES } from 'src/constants/card-message.constant';

// @UseGuards(AuthGuard('jwt'))
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post(':listId')
  async createCard(
    @UserInfo() user: User,
    @Param('listId') listId: number,
    @Body() createCardDto: CreateCardDto
  ) {
    const createCard = await this.cardService.createCard(
      user.id,
      listId,
      createCardDto
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: '카드가 생성되었습니다.',
      createCard,
    };
  }

  @Get('list/:listId')
  async findAllCards(@UserInfo() user: User, @Param('listId') listId: number) {
    const findAllCards = await this.cardService.findAllCards(user.id, listId);
    return {
      statusCode: HttpStatus.OK,
      message: CARD_MESSAGES.CARD.READ_CARDS.SUCCESS,
      findAllCards,
    };
  }

  @Get(':cardId')
  async findCard(@UserInfo() user: User, @Param('cardId') cardId: number) {
    const findCard = await this.cardService.findCard(user.id, cardId);

    return {
      statusCode: HttpStatus.OK,
      message: CARD_MESSAGES.CARD.READ_CARD.SUCCESS,
      findCard,
    };
  }

  // 카드내용 수정 api

  @Patch(':cardId')
  async updateContent(
    @UserInfo() user: User,
    @Param('cardId') cardId: number,
    @Body() updateCardDto: UpdateCardDto
  ) {
    const updateContent = await this.cardService.updateContent(
      user.id,
      cardId,
      updateCardDto
    );
    return {
      statusCode: HttpStatus.OK,
      message: CARD_MESSAGES.CARD.UPDATE.SUCCESS,
      updateContent,
    };
  }

  // 카드이동 api
  @Patch(':cardId/move')
  updateOrderAndList(
    @Param('id') id: string,
    @Body() moveCardDto: MoveCardDto
  ) {
    return this.cardService.updateOrderAndList(+id, moveCardDto);
  }

  @Delete(':cardId')
  async deleteCard(@UserInfo() user: User, @Param('cardId') cardId: number) {
    const deleteCard = await this.cardService.deleteCard(user.id, cardId);

    return {
      STATUS_CODES: HttpStatus.OK,
      messeage: CARD_MESSAGES.CARD.DELETE.SUCCESS,
      deleteCard,
    };
  }
}
