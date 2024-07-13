import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('cards/:cardId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(
    @Param('cardId', ParseIntPipe) cardId: number,
    @Body() createCommentDto: CreateCommentDto
  ) {
    const userId = 1; // 사용자 ID 하드코딩
    return this.commentService.create(createCommentDto, userId, cardId);
  }

  @Get()
  findAll(@Param('cardId', ParseIntPipe) cardId: number) {
    return this.commentService.findAll(cardId);
  }

  @Get(':id')
  findOne(
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    const userId = 1; // 사용자 ID 하드 코딩
    return this.commentService.update(id, updateCommentDto, userId);
  }

  @Delete(':id')
  remove(
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('id') id: number
  ) {
    const userId = 1; // 사용자 ID 하드 코딩
    return this.commentService.remove(id, userId);
  }
}
