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

import { User } from 'src/user/entities/user.entity';
import { CARD_MESSAGES } from 'src/constants/card-message.constant';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LogIn } from 'src/auth/decorator/login.decorator';
import { BoardUserRoles } from 'src/auth/decorator/board-user-roles.decorator';
import { BoardUserRolesGuard } from 'src/auth/guard/board-user-roles.guard';
import { BoardUserRole } from 'src/board/types/board-user.type';

@ApiTags('4. 카드 API')
@UseGuards(BoardUserRolesGuard)
@BoardUserRoles(BoardUserRole.member, BoardUserRole.host, BoardUserRole.admin)
@ApiBearerAuth()
@Controller('/boards/:boardId')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  // 카드생성 api
  @ApiOperation({ summary: '카드 생성' })
  @ApiBody({ type: CreateCardDto })
  @ApiParam({ name: 'boardId', description: '보드의 ID', type: 'number' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CARD_MESSAGES.CARD.CREATE.SUCCESS,
  })
  @Post('/cards')
  async createCard(@LogIn() user: User, @Body() createCardDto: CreateCardDto) {
    const createCard = await this.cardService.createCard(
      user.id,
      createCardDto
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: '카드가 생성되었습니다.',
      createCard,
    };
  }

  // 카드전체조회 api
  @ApiOperation({ summary: '카드 전체 조회' })
  @ApiParam({ name: 'boardId', description: '보드의 ID', type: 'number' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CARD_MESSAGES.CARD.READ_CARDS.SUCCESS,
  })
  @Get('/list/:listId/cards')
  async findAllCards(@Param('listId') listId: number) {
    const findAllCards = await this.cardService.findAllCards(listId);
    return {
      statusCode: HttpStatus.OK,
      message: CARD_MESSAGES.CARD.READ_CARDS.SUCCESS,
      findAllCards,
    };
  }

  // 카드상세조회 api
  @ApiOperation({ summary: '카드 상세 조회' })
  @ApiParam({ name: 'boardId', description: '보드의 ID', type: 'number' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CARD_MESSAGES.CARD.READ_CARD.SUCCESS,
  })
  @Get('/cards/:cardId')
  async findCard(@Param('cardId') cardId: number) {
    const findCard = await this.cardService.findCard(cardId);

    return {
      statusCode: HttpStatus.OK,
      message: CARD_MESSAGES.CARD.READ_CARD.SUCCESS,
      findCard,
    };
  }

  // 카드내용 수정 api
  @ApiOperation({ summary: '카드 내용 수정' })
  @ApiParam({ name: 'boardId', description: '보드의 ID', type: 'number' })
  @ApiBody({ type: UpdateCardDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CARD_MESSAGES.CARD.UPDATE.SUCCESS,
  })
  @Patch('/cards/:cardId')
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
  @ApiOperation({ summary: '카드 순서 이동' })
  @ApiParam({ name: 'boardId', description: '보드의 ID', type: 'number' })
  @ApiBody({ type: MoveCardDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CARD_MESSAGES.CARD.UPDATE.SUCCESS,
  })
  @Patch('/cards/:cardId/move')
  moveCard(
    @LogIn() user: User,
    @Param('cardId') cardId: number,
    @Body() moveCardDto: MoveCardDto
  ) {
    return this.cardService.moveCard(user.id, cardId, moveCardDto);
  }

  // 카드 삭제 api
  @ApiOperation({ summary: '카드 삭제' })
  @ApiParam({ name: 'boardId', description: '보드의 ID', type: 'number' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CARD_MESSAGES.CARD.DELETE.SUCCESS,
  })
  @Delete('/cards/:cardId')
  async deleteCard(@LogIn() user: User, @Param('cardId') cardId: number) {
    const deleteCard = await this.cardService.deleteCard(user.id, cardId);

    return {
      STATUS_CODES: HttpStatus.OK,
      messeage: CARD_MESSAGES.CARD.DELETE.SUCCESS,
      deleteCard,
    };
  }
}
