import {
  Body,
  Controller,
  Get,
  Delete,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { List } from './entities/list.entity';
import { ListService } from './list.service';
import { LIST_MESSAGES } from 'src/constants/list-message.constant';

import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { MoveListDto } from './dto/move-list.dto';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { BoardUserRoles } from 'src/auth/decorator/board-user-roles.decorator';
import { BoardUserRolesGuard } from 'src/auth/guard/board-user-roles.guard';
import { BoardUserRole } from 'src/board/types/board-user.type';

@UseGuards(BoardUserRolesGuard)
@BoardUserRoles(BoardUserRole.host, BoardUserRole.admin, BoardUserRole.member)
@ApiTags('3. 리스트 API')
@ApiBearerAuth()
@Controller('/boards')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @ApiOperation({
    summary: 'List 생성 API',
    description: 'List를 생성합니다.',
  })
  @ApiBody({ type: CreateListDto })
  @ApiParam({
    name: 'boardId',
    description: 'ID of board',
    type: 'number',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: LIST_MESSAGES.LIST.CREATE.SUCCESS,
    type: List,
  })
  @Post('/:boardId/lists')
  async createList(
    @Param('boardId') boardId: number,
    @Body() createListDto: CreateListDto
  ) {
    const createList = await this.listService.createList(
      boardId,
      createListDto
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: LIST_MESSAGES.LIST.CREATE.SUCCESS,
      createList,
    };
  }

  @ApiOperation({
    summary: 'List 목록 조회 API',
    description: 'List의 목록을 조회합니다.',
  })
  @ApiParam({
    name: 'boardId',
    description: 'ID of board',
    type: 'number',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: LIST_MESSAGES.LIST.READ_LIST.SUCCESS,
    type: [List],
  })
  @Get('/:boardId/lists')
  async findAllLists(@Param('boardId') boardId: number) {
    const findAllLists = await this.listService.findAllLists(boardId);
    console.log(findAllLists);
    return {
      statusCode: HttpStatus.OK,
      message: LIST_MESSAGES.LIST.READ_LIST.SUCCESS,
      findAllLists,
    };
  }

  @ApiOperation({
    summary: 'List 상세 조회 API',
    description: 'List를 상세 조회합니다.',
  })
  @ApiParam({
    name: 'boardId',
    description: 'ID of board',
    type: 'number',
  })
  @ApiParam({
    name: 'listId',
    description: 'ID of the list',
    type: 'number',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: LIST_MESSAGES.LIST.READ_DETAIL.SUCCESS,
    type: List,
  })
  @Get('/:boardId/lists/:listId')
  async findListById(@Param('listId') listId: number) {
    const findListById = await this.listService.findListById(listId);

    return {
      statusCode: HttpStatus.OK,
      message: LIST_MESSAGES.LIST.READ_DETAIL.SUCCESS,
      findListById,
    };
  }

  @ApiOperation({
    summary: 'List 이름 수정 API',
    description: 'List의 이름을 수정합니다.',
  })
  @ApiParam({
    name: 'boardId',
    description: 'ID of board',
    type: 'number',
  })
  @ApiParam({
    name: 'listId',
    description: 'ID of the list',
    type: 'number',
  })
  @ApiBody({ type: UpdateListDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: LIST_MESSAGES.LIST.UPDATE.SUCCESS_NAME,
    type: List,
  })
  @Patch('/:boardId/lists/:listId')
  async updateList(
    @Param('listId') listId: number,
    @Body() updateListDto: UpdateListDto
  ) {
    const updateList = await this.listService.updateList(listId, updateListDto);

    return {
      statusCode: HttpStatus.OK,
      message: LIST_MESSAGES.LIST.UPDATE.SUCCESS_NAME,
      updateList,
    };
  }

  @ApiOperation({
    summary: 'List 순서 이동 API',
    description: 'List를 이동합니다.',
  })
  @ApiParam({
    name: 'boardId',
    description: 'ID of board',
    type: 'number',
  })
  @ApiParam({
    name: 'listId',
    description: 'ID of the list',
    type: 'number',
  })
  @ApiBody({ type: MoveListDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: LIST_MESSAGES.LIST.UPDATE.SUCCESS_ORDER,
    type: List,
  })
  @Patch('/:boardId/lists/:listId/move')
  async moveList(
    @Param('listId') listId: number,
    @Body() moveListDto: MoveListDto
  ) {
    const moveList = await this.listService.moveList(listId, moveListDto);

    return {
      statusCode: HttpStatus.OK,
      message: LIST_MESSAGES.LIST.UPDATE.SUCCESS_ORDER,
      moveList,
    };
  }

  @ApiOperation({
    summary: 'List 삭제 API',
    description: 'List를 삭제합니다.',
  })
  @ApiParam({
    name: 'boardId',
    description: 'ID of board',
    type: 'number',
  })
  @ApiParam({
    name: 'listId',
    description: 'ID of the list',
    type: 'number',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: LIST_MESSAGES.LIST.DELETE.SUCCESS,
  })
  @Delete('/:boardId/lists/:listId')
  async removeList(@Param('listId') listId: number) {
    const removeList = await this.listService.removeList(listId);

    return {
      statusCode: HttpStatus.OK,
      message: LIST_MESSAGES.LIST.DELETE.SUCCESS,
      removeList,
    };
  }
}
