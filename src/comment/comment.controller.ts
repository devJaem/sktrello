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
  // UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { COMMENT_MESSAGE } from 'src/constants/comment.message.constant';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserInfo } from 'src/utils/test-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiTags('7. 댓글 API')
@ApiBearerAuth()
@Controller('cards/:cardId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /** 댓글 생성 API**/
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: COMMENT_MESSAGE.COMMENT.CREATE.SUCCESS,
  })
  @Post()
  async create(
    @UserInfo() user: User, // @Request() req: any 로 바꿔야됨?
    @Param('cardId', ParseIntPipe) cardId: number,
    @Body() createCommentDto: CreateCommentDto
  ) {
    const userId = user.id; // 사용자 ID user.id. ======> req.user.id
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
  async findAll(@Param('cardId', ParseIntPipe) cardId: number) {
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
  @Patch(':id')
  async update(
    @UserInfo() user: User,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('id', ParseIntPipe) id: number,
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
  @Delete(':id')
  async remove(
    @UserInfo() user: User,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('id') id: number
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
