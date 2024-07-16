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
import { User } from 'src/user/entities/user.entity';
import { List } from './entities/list.entity';
import { ListService } from './list.service';
import { LIST_MESSAGES } from 'src/constants/list-message.constant';

import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { MoveListDto } from './dto/move-list.dto';

import { LogIn } from 'src/auth/decorator/login.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
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
    @LogIn() user: User,
    @Param('boardId') boardId: number,
    @Body() createListDto: CreateListDto,
    @Body() moveListDto: MoveListDto
  ) {
    const createList = await this.listService.createList(
      user.id,
      boardId,
      createListDto,
      moveListDto
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
  async findAllLists(@LogIn() user: User, @Param('boardId') boardId: number) {
    const findAllLists = await this.listService.findAllLists(user.id, boardId);

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
  async findListById(@LogIn() user: User, @Param('listId') listId: number) {
    const findListById = await this.listService.findListById(user.id, listId);

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
    @LogIn() user: User,
    @Param('listId') listId: number,
    @Body() updateListDto: UpdateListDto
  ) {
    const updateList = await this.listService.updateList(
      user.id,
      listId,
      updateListDto
    );

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
    @LogIn() user: User,
    @Param('listId') listId: number,
    @Body() moveListDto: MoveListDto
  ) {
    const moveList = await this.listService.moveList(
      user.id,
      listId,
      moveListDto
    );

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
  async removeList(@LogIn() user: User, @Param('listId') listId: number) {
    const removeList = await this.listService.removeList(user.id, listId);

    return {
      statusCode: HttpStatus.OK,
      message: LIST_MESSAGES.LIST.DELETE.SUCCESS,
      removeList,
    };
  }
}
