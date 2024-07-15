import {
  Body,
  Controller,
  Get,
  Delete,
  HttpStatus,
  Param,
  Patch,
  Post,
  // UseGuards,
} from '@nestjs/common';
import { ListService } from './list.service';

import { MESSAGES } from 'src/constants/message.constants';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { MoveListDto } from './dto/move-list.dto';
// import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/utils/user.decorator'; // 임시 user 데코레이터 생성

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  /**
   * List 생성
   * @param user
   * @param createListDto
   * @returns
   */
  // @UseGuards(AuthGuard('jwt')) // JWT 인증을 통해 인증된 사용자만 접근 가능하도록 함
  @Post()
  async createList(@User() user, @Body() createListDto: CreateListDto) {
    const createList = await this.listService.createList(
      user.id,
      createListDto
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: MESSAGES.LIST.CREATE.SUCCESS,
      createList,
    };
  }

  /**
   * List 조회
   * @param user
   * @returns
   */
  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAllLists(@User() user) {
    const findAllLists = await this.listService.findAllLists(user.id);

    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.LIST.READ_LIST.SUCCESS,
      findAllLists,
    };
  }

  /**
   * List 상세 조회
   * @param user
   * @param listId
   * @returns
   */
  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async findListById(@User() user, @Param('listId') listId: number) {
    const findListById = await this.listService.findListById(user.id, listId);

    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.LIST.READ_DETAIL.SUCCESS,
      findListById,
    };
  }

  /**
   * List 이름 수정
   * @param user
   * @param listId
   * @param updateListDto
   * @returns
   */
  // @UseGuards(AuthGuard('jwt'))
  @Patch(':listId')
  async updateList(
    @User() user,
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
      message: MESSAGES.LIST.UPDATE.SUCCESS_NAME,
      updateList,
    };
  }

  /**
   * List 순서 이동
   * @param user
   * @param listId
   * @param moveListDto
   * @returns
   */
  // @UseGuards(AuthGuard('jwt'))
  @Patch(':listId/move')
  async moveList(
    @User() user,
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
      message: MESSAGES.LIST.UPDATE.SUCCESS_ORDER,
      moveList,
    };
  }

  /**
   * List 삭제
   * @param user
   * @param listId
   * @returns
   */
  // @UseGuards(AuthGuard('jwt'))
  @Delete(':listId')
  async removeList(@User() user, @Param('listId') listId: number) {
    const removeList = await this.listService.removeList(user.id, listId);

    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.LIST.DELETE.SUCCESS,
      removeList,
    };
  }
}
