import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { MoveCardDto } from './dto/move-card.dto';

import { LogIn } from 'src/auth/decorator/login.decorator';
import { CARD_MESSAGES } from 'src/constants/card-message.constant';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('cards')
@ApiTags('카드 API')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post(':listId')
  @ApiOperation({ summary: '카드 생성' })
  @ApiBody({ type: CreateCardDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CARD_MESSAGES.CARD.CREATE.SUCCESS,
  })
  async createCard(
    @LogIn() user: User,
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
  @ApiOperation({ summary: '카드 전체 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CARD_MESSAGES.CARD.READ_CARDS.SUCCESS,
  })
  async findAllCards(@LogIn() user: User, @Param('listId') listId: number) {
    const findAllCards = await this.cardService.findAllCards(user.id, listId);
    return {
      statusCode: HttpStatus.OK,
      message: CARD_MESSAGES.CARD.READ_CARDS.SUCCESS,
      findAllCards,
    };
  }

  @Get(':cardId')
  @ApiOperation({ summary: '카드 상세 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CARD_MESSAGES.CARD.READ_CARD.SUCCESS,
  })
  async findCard(@LogIn() user: User, @Param('cardId') cardId: number) {
    const findCard = await this.cardService.findCard(user.id, cardId);

    return {
      statusCode: HttpStatus.OK,
      message: CARD_MESSAGES.CARD.READ_CARD.SUCCESS,
      findCard,
    };
  }

  // 카드내용 수정 api

  @Patch(':cardId')
  @ApiOperation({ summary: '카드 내용 수정' })
  @ApiBody({ type: UpdateCardDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CARD_MESSAGES.CARD.UPDATE.SUCCESS,
  })
  async updateContent(
    @LogIn() user: User,
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
  @ApiOperation({ summary: '카드 순서 이동' })
  @ApiBody({ type: MoveCardDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CARD_MESSAGES.CARD.READ_CARD.SUCCESS,
  })
  moveCard(
    @LogIn() user: User,
    @Param('cardId') cardId: number,
    @Body() moveCardDto: MoveCardDto
  ) {
    return this.cardService.moveCard(user.id, cardId, moveCardDto);
  }

  @Delete(':cardId')
  @ApiOperation({ summary: '카드 삭제' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CARD_MESSAGES.CARD.DELETE.SUCCESS,
  })
  async deleteCard(@LogIn() user: User, @Param('cardId') cardId: number) {
    const deleteCard = await this.cardService.deleteCard(user.id, cardId);

    return {
      STATUS_CODES: HttpStatus.OK,
      messeage: CARD_MESSAGES.CARD.DELETE.SUCCESS,
      deleteCard,
    };
  }
}
