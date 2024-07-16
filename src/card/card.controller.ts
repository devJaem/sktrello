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

import { UserInfo } from 'src/utils/test-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CARD_MESSAGES } from 'src/constants/card-message.constant';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('cards')
@ApiTags('4. 카드 API')
@ApiBearerAuth()
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post(':listId')
  @ApiOperation({ summary: '카드 생성' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CARD_MESSAGES.CARD.CREATE.SUCCESS,
  })
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
  @ApiOperation({ summary: '카드 전체 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CARD_MESSAGES.CARD.READ_CARDS.SUCCESS,
  })
  async findAllCards(@UserInfo() user: User, @Param('listId') listId: number) {
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
  @ApiOperation({ summary: '카드 내용 수정' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CARD_MESSAGES.CARD.UPDATE.SUCCESS,
  })
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
  @ApiOperation({ summary: '카드 순서 이동' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CARD_MESSAGES.CARD.READ_CARD.SUCCESS,
  })
  moveCard(
    @UserInfo() user: User,
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
  async deleteCard(@UserInfo() user: User, @Param('cardId') cardId: number) {
    const deleteCard = await this.cardService.deleteCard(user.id, cardId);

    return {
      STATUS_CODES: HttpStatus.OK,
      messeage: CARD_MESSAGES.CARD.DELETE.SUCCESS,
      deleteCard,
    };
  }
}
