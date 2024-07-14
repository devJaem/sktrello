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
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
// import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/utils/user.decorator'; // 임시 user 데코레이터 생성

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  /** 리스트 생성 API **/
  // @UseGuards(AuthGuard('jwt')) // JWT 인증을 통해 인증된 사용자만 접근 가능하도록 함
  @Post()
  async createList(@User() user, @Body() createListDto: CreateListDto) {
    const createList = await this.listService.createList(
      user.id,
      createListDto
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: '리스트 생성에 성공했습니다.',
      createList,
    };
  }

  /** 리스트 조회 API **/
  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAllLists() {
    const findAllLists = await this.listService.findAllLists();

    return {
      statusCode: HttpStatus.OK,
      message: '리스트 조회에 성공했습니다.',
      findAllLists,
    };
  }

  /** 리스트 상세 조회 API **/
  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async findListById(@Param('listId') listId: number) {
    const findListById = await this.listService.findListById(listId);

    return {
      statusCode: HttpStatus.OK,
      message: '리스트 상세 조회에 성공했습니다.',
      findListById,
    };
  }

  /** 리스트 이름 수정 API **/
  // @UseGuards(AuthGuard('jwt'))
  @Patch(':listId')
  async updateList(
    @Param('listId') listId: number,
    @Body() updateListDto: UpdateListDto
  ) {
    const updateList = await this.listService.updateList(listId, updateListDto);

    return {
      statusCode: HttpStatus.OK,
      message: '리스트 이름 수정에 성공했습니다.',
      updateList,
    };
  }

  /** 리스트 순서 이동 API **/
  @Patch(':listId/move')
  moveList(@Param('listId') listId: number) {
    return this.listService.moveList(listId);
  }

  /** 리스트 삭제 API **/
  // @UseGuards(AuthGuard('jwt'))
  @Delete(':listId')
  async removeList(@Param('listId') listId: number) {
    const removeList = await this.removeList(listId);

    return {
      statusCode: HttpStatus.OK,
      message: '리스트 삭제에 성공했습니다.',
      removeList,
    };
  }
}
