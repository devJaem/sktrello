import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { COMMENT_MESSAGE } from 'src/constants/comment.message.constants';

@Controller('cards/:cardId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 댓글 생성
  @Post()
  async create(
    @Param('cardId', ParseIntPipe) cardId: number,
    @Body() createCommentDto: CreateCommentDto
  ) {
    const userId = 1; // 사용자 ID 하드코딩
    const createdComment = await this.commentService.create(
      createCommentDto,
      userId,
      cardId
    );
    return {
      status: HttpStatus.CREATED,
      message: COMMENT_MESSAGE.COMMENT.CREATE.SUCCESS,
      data: createdComment,
    };
  }

  // 댓글 조회
  @Get()
  async findAll(@Param('cardId', ParseIntPipe) cardId: number) {
    const readAllComment = await this.commentService.findAll(cardId);
    return {
      status: HttpStatus.OK,
      message: COMMENT_MESSAGE.COMMENT.READ_ALL.SUCCESS,
      data: readAllComment,
    };
  }

  // 댓글 수정
  @Patch(':id')
  async update(
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    const userId = 1; // 사용자 ID 하드 코딩
    const updateComment = await this.commentService.update(
      id,
      updateCommentDto,
      userId
    );
    return {
      status: HttpStatus.OK,
      message: COMMENT_MESSAGE.COMMENT.UPDATE.SUCCESS,
      data: updateComment,
    };
  }

  // 댓글 삭제
  @Delete(':id')
  async remove(
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('id') id: number
  ) {
    const userId = 1; // 사용자 ID 하드 코딩
    const deleteComment = await this.commentService.remove(id, userId);
    return {
      status: HttpStatus.OK,
      message: COMMENT_MESSAGE.COMMENT.DELETE.SUCCESS,
      data: deleteComment,
    };
  }
}
