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

import { MESSAGES } from 'src/constants/message.constants';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InviteBoardMemberDto } from './dto/invite-board-member.dto';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  /** Board 생성(C) API **/
  @Post('')
  async createBoard(@Body() createBoardDto: CreateBoardDto) {
    const createdBoard = await this.boardService.createBoard(
      user,
      createBoardDto
    );
    const result = {
      status: HttpStatus.CREATED,
      message: MESSAGES.BOARD.CREATE.SUCCESS,
      data: createdBoard,
    };
    return result;
  }

  /** Board 목록 조회(R-L) **/
  @Get('')
  async findAllBoard() {
    const foundAllBoard = await this.boardService.findAllBoard(user);
    const result = {
      status: HttpStatus.OK,
      message: MESSAGES.BOARD.READ_LIST.SUCCESS,
      data: {
        participatedIn: foundAllBoard,
      },
    };
    return result;
  }

  /** Board 상세 조회(R-D) **/
  @Get(':boardId')
  async findOneBoard(@Param('boardId') boardId: number) {
    const foundOneBoard = await this.boardService.findOneBoard(user, boardId);
    const result = {
      status: HttpStatus.OK,
      message: MESSAGES.BOARD.READ_DETAIL.SUCCESS,
      data: foundOneBoard,
    };
    return result;
  }

  /** Board 수정(U) API **/
  @Patch(':boardId')
  async updateBoard(
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
      message: MESSAGES.BOARD.UPDATE.SUCCESS,
      data: updatedBoard,
    };
    return result;
  }

  /** Board 삭제(D) API **/
  @Delete(':boardId')
  async softDeleteBoard(@Param('boardId') boardId: number) {
    const deletedBoard = await this.boardService.softDeleteBoard(user, boardId);
    const result = {
      status: HttpStatus.OK,
      message: MESSAGES.BOARD.DELETE.SUCCESS,
      data: deletedBoard,
    };
    return result;
  }

  /** Board 멤버 초대(Invite) API **/
  @Post(':boardId/invite')
  async inviteBoardMember(
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
      message: MESSAGES.BOARD.INVITE.SUCCESS,
      data: {
        nickname: invitedMember.nickname,
        email: invitedMember.email,
      },
    };
    return result;
  }
}
