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
import { BoardService } from './board.service';

import { BOARD_MESSAGES } from 'src/constants/board-message.constant';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InviteBoardMemberDto } from './dto/invite-board-member.dto';

import { LogIn } from 'src/auth/decorator/login.decorator';
import { AuthGuard } from '@nestjs/passport';

import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BoardUserRolesGuard } from 'src/auth/guard/board-user-roles.guard';
import { BoardUserRole } from './types/board-user.type';
import { BoardUserRoles } from 'src/auth/decorator/board-user-roles.decorator';
import { User } from 'src/user/entities/user.entity';

@UseGuards(AuthGuard('jwt'))
@ApiTags('2. 보드 API')
@ApiBearerAuth()
@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  /** Board 생성(C) API **/
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: BOARD_MESSAGES.BOARD.CREATE.SUCCESS,
  })
  @Post('')
  async createBoard(
    @LogIn() user: User,
    @Body() createBoardDto: CreateBoardDto
  ) {
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: BOARD_MESSAGES.BOARD.READ_LIST.SUCCESS,
  })
  @Get('')
  async findAllBoard(@LogIn() user: User) {
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: BOARD_MESSAGES.BOARD.READ_DETAIL.SUCCESS,
  })
  @Get(':boardId')
  async findOneBoard(@LogIn() user: User, @Param('boardId') boardId: number) {
    const foundOneBoard = await this.boardService.findOneBoard(user, boardId);
    const result = {
      status: HttpStatus.OK,
      message: BOARD_MESSAGES.BOARD.READ_DETAIL.SUCCESS,
      data: foundOneBoard,
    };
    return result;
  }

  /** Board 수정(U) API **/
  @ApiResponse({
    status: HttpStatus.OK,
    description: BOARD_MESSAGES.BOARD.UPDATE.SUCCESS,
  })
  @Patch(':boardId')
  async updateBoard(
    @LogIn() user: User,
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
  @UseGuards(BoardUserRolesGuard)
  @BoardUserRoles(BoardUserRole.host)
  @ApiResponse({
    status: HttpStatus.OK,
    description: BOARD_MESSAGES.BOARD.DELETE.SUCCESS,
  })
  @Delete(':boardId')
  async softDeleteBoard(
    @LogIn() user: User,
    @Param('boardId') boardId: number
  ) {
    console.log('=======================================================');
    const deletedBoard = await this.boardService.softDeleteBoard(user, boardId);
    const result = {
      status: HttpStatus.OK,
      message: BOARD_MESSAGES.BOARD.DELETE.SUCCESS,
      data: deletedBoard,
    };
    return result;
  }

  /** Board 멤버 초대(Invite) API **/
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: BOARD_MESSAGES.BOARD.INVITATION.SUCCESS,
  })
  @Post(':boardId/invitation')
  async inviteBoardMember(
    @LogIn() user: User,
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
      message: BOARD_MESSAGES.BOARD.INVITATION.SUCCESS,
      data: {
        nickname: invitedMember.nickname,
        email: invitedMember.email,
      },
    };
    return result;
  }

  // /** Board 초대 수락(U) API **/
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: BOARD_MESSAGES.BOARD.ACCEPT_INVITATION.SUCCESS,
  // })
  // @Patch(':boardId/accept-invitation')
  // async acceptInvitation(@LogIn() user: User, @Param('boardId') boardId: number) {
  //   const acceptedInvitation = await this.boardService.acceptInvitation(
  //     user,
  //     boardId
  //   );
  //   const result = {
  //     status: HttpStatus.OK,
  //     message: BOARD_MESSAGES.BOARD.ACCEPT_INVITATION.SUCCESS,
  //     data: acceptedInvitation,
  //   };
  //   return result;
  // }

  // /** Board 초대 거절(D) API **/
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: BOARD_MESSAGES.BOARD.DECLINE_INVITATION.SUCCESS,
  // })
  // @Delete(':boardId/decline-invitation')
  // async declineInvitation(
  //   @LogIn() user: User,
  //   @Param('boardId') boardId: number
  // ) {
  //   const declinedInvitation = await this.boardService.declineInvitation(
  //     user,
  //     boardId
  //   );
  //   const result = {
  //     status: HttpStatus.OK,
  //     message: BOARD_MESSAGES.BOARD.DECLINE_INVITATION.SUCCESS,
  //     data: declinedInvitation,
  //   };
  //   return result;
  // }
  //
}
