import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { MoveCardDto } from './dto/move-card.dto';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardService.findOne(+id);
  }

  // 카드내용 수정 api
  // @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  updateContent(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.updateContent(+id, updateCardDto);
  }

  // 카드이동 api
  // @UseGuards(AuthGuard('jwt'))
  @Patch(':id/move')
  updateOrderAndList(
    @Param('id') id: string,
    @Body() moveCardDto: MoveCardDto
  ) {
    return this.cardService.updateOrderAndList(+id, moveCardDto);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardService.remove(+id);
  }
}
