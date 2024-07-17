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
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { COMMENT_MESSAGE } from 'src/constants/comment.message.constant';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { LogIn } from 'src/auth/decorator/login.decorator';
import { BoardUserRolesGuard } from 'src/auth/guard/board-user-roles.guard';
import { BoardUserRoles } from 'src/auth/decorator/board-user-roles.decorator';
import { BoardUserRole } from 'src/board/types/board-user.type';

@UseGuards(BoardUserRolesGuard)
@BoardUserRoles(BoardUserRole.host, BoardUserRole.admin, BoardUserRole.member)
@ApiTags('7. 댓글 API')
@ApiBearerAuth()
@Controller('boards/:boardId/cards/:cardId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /** 댓글 생성 API**/
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: COMMENT_MESSAGE.COMMENT.CREATE.SUCCESS,
  })
  @Post()
  async create(
    @LogIn() user: User,
    @Param('boardId') boardId: string,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Body() createCommentDto: CreateCommentDto
  ) {
    const userId = user.id;
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

  /** 댓글 조회 API**/
  @ApiResponse({
    status: HttpStatus.OK,
    description: COMMENT_MESSAGE.COMMENT.READ_ALL.SUCCESS,
  })
  @Get()
  async findAll(
    @Param('boardId') boardId: string,
    @Param('cardId', ParseIntPipe) cardId: number
  ) {
    const readAllComment = await this.commentService.findAll(cardId);
    return {
      status: HttpStatus.OK,
      message: COMMENT_MESSAGE.COMMENT.READ_ALL.SUCCESS,
      data: readAllComment,
    };
  }

  /** 댓글 수정 API**/
  @ApiResponse({
    status: HttpStatus.OK,
    description: COMMENT_MESSAGE.COMMENT.UPDATE.SUCCESS,
  })
  @Patch(':commentId')
  async update(
    @LogIn() user: User,
    @Param('boardId') boardId: string,
    @Param('commentId', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    const userId = user.id; // 사용자 ID
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

  /** 댓글 삭제 API**/
  @ApiResponse({
    status: HttpStatus.OK,
    description: COMMENT_MESSAGE.COMMENT.DELETE.SUCCESS,
  })
  @Delete(':commentId')
  async remove(
    @LogIn() user: User,
    @Param('boardId') boardId: string,
    @Param('commentId') id: number
  ) {
    const userId = user.id; // 사용자 ID
    const deleteComment = await this.commentService.remove(id, userId);
    return {
      status: HttpStatus.OK,
      message: COMMENT_MESSAGE.COMMENT.DELETE.SUCCESS,
      data: deleteComment,
    };
  }
}
