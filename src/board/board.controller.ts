import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { BoardService } from './board.service';

import { BOARD_MESSAGES } from 'src/constants/board-message.constant';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InviteBoardMemberDto } from './dto/invite-board-member.dto';
import { TestLogIn } from 'src/utils/test-user.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('보드 API')
@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  /** Board 생성(C) API **/
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: BOARD_MESSAGES.BOARD.CREATE.SUCCESS,
  })
  @Post('')
  async createBoard(@TestLogIn() user, @Body() createBoardDto: CreateBoardDto) {
    const createdBoard = await this.boardService.createBoard(
      user,
      createBoardDto
    );
    const result = {
      status: HttpStatus.CREATED,
      message: BOARD_MESSAGES.BOARD.CREATE.SUCCESS,
      data: createdBoard,
    };
    return result;
  }

  /** Board 목록 조회(R-L) **/
  @Get('')
  async findAllBoard(@TestLogIn() user) {
    const foundAllBoard = await this.boardService.findAllBoard(user);
    const result = {
      status: HttpStatus.OK,
      message: BOARD_MESSAGES.BOARD.READ_LIST.SUCCESS,
      data: {
        participatedIn: foundAllBoard,
      },
    };
    return result;
  }

  /** Board 상세 조회(R-D) **/
  @Get(':boardId')
  async findOneBoard(@TestLogIn() user, @Param('boardId') boardId: number) {
    const foundOneBoard = await this.boardService.findOneBoard(user, boardId);
    const result = {
      status: HttpStatus.OK,
      message: BOARD_MESSAGES.BOARD.READ_DETAIL.SUCCESS,
      data: foundOneBoard,
    };
    return result;
  }

  /** Board 수정(U) API **/
  @Patch(':boardId')
  async updateBoard(
    @TestLogIn() user,
    @Param('boardId') boardId: number,
    @Body() updateBoardDto: UpdateBoardDto
  ) {
    const updatedBoard = await this.boardService.updateBoard(
      user,
      boardId,
      updateBoardDto
    );
    const result = {
      status: HttpStatus.OK,
      message: BOARD_MESSAGES.BOARD.UPDATE.SUCCESS,
      data: updatedBoard,
    };
    return result;
  }

  /** Board 삭제(D) API **/
  @Delete(':boardId')
  async softDeleteBoard(@TestLogIn() user, @Param('boardId') boardId: number) {
    const deletedBoard = await this.boardService.softDeleteBoard(user, boardId);
    const result = {
      status: HttpStatus.OK,
      message: BOARD_MESSAGES.BOARD.DELETE.SUCCESS,
      data: deletedBoard,
    };
    return result;
  }

  /** Board 멤버 초대(Invite) API **/
  @Post(':boardId/invite')
  async inviteBoardMember(
    @TestLogIn() user,
    @Param('boardId') boardId: number,
    @Body() inviteBoardMemberDto: InviteBoardMemberDto
  ) {
    const invitedMember = await this.boardService.inviteBoardMember(
      user,
      boardId,
      inviteBoardMemberDto
    );
    const result = {
      status: HttpStatus.CREATED,
      message: BOARD_MESSAGES.BOARD.INVITE.SUCCESS,
      data: {
        nickname: invitedMember.nickname,
        email: invitedMember.email,
      },
    };
    return result;
  }
}
