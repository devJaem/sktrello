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
import { CheckItemService } from './checkItem.service';
import { CreateCheckItemDto } from './dto/create-checkItem.dto';
import { UpdateCheckItemDto } from './dto/update-checkItem.dto';
import { MoveCheckItemDto } from './dto/move-checkItem.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CHECK_MESSAGES } from '../constants/check-message.constant'; // 메시지 상수 파일 가져오기

@Controller('checklists/:checklistId/items')
export class CheckItemController {
  constructor(private readonly checkItemService: CheckItemService) {}

  @Post()
  @ApiOperation({ summary: '체크리스트 아이템 생성' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CHECK_MESSAGES.CHECKITEM.CREATE,
  })
  async create(
    @Param('checklistId') checklistId: number,
    @Body() createCheckItemDto: CreateCheckItemDto
  ) {
    const newCheckItem = await this.checkItemService.create({
      ...createCheckItemDto,
      checkListId: checklistId,
    });
    return {
      statusCode: HttpStatus.CREATED,
      message: CHECK_MESSAGES.CHECKITEM.CREATE,
      data: newCheckItem,
    };
  }

  @Get()
  @ApiOperation({ summary: '체크리스트 아이템 전체 조회' })
  async findAll(@Param('checklistId') checklistId: number) {
    const checkItems = await this.checkItemService.findAll(checklistId);
    return {
      statusCode: HttpStatus.OK,
      data: checkItems,
    };
  }

  @Get(':itemId')
  @ApiOperation({ summary: '체크리스트 아이템 단일 조회' })
  async findOne(@Param('itemId') itemId: number) {
    const checkItem = await this.checkItemService.findOne(itemId);
    return {
      statusCode: HttpStatus.OK,
      data: checkItem,
    };
  }

  @Patch(':itemId')
  @ApiOperation({ summary: '체크리스트 아이템 수정' })
  async update(
    @Param('itemId') itemId: number,
    @Body() updateCheckItemDto: UpdateCheckItemDto
  ) {
    const updatedCheckItem = await this.checkItemService.update(
      itemId,
      updateCheckItemDto
    );
    return {
      statusCode: HttpStatus.OK,
      message: CHECK_MESSAGES.CHECKITEM.UPDATE,
      data: updatedCheckItem,
    };
  }

  @Delete(':itemId')
  @ApiOperation({ summary: '체크리스트 아이템 삭제' })
  async remove(@Param('itemId') itemId: number) {
    const deletedCheckItem = await this.checkItemService.remove(itemId);
    return {
      statusCode: HttpStatus.OK,
      message: CHECK_MESSAGES.CHECKITEM.DELETE,
      data: deletedCheckItem,
    };
  }

  @Patch(':itemId/move')
  @ApiOperation({ summary: '체크리스트 내의 아이템 이동' })
  async moveItemWithinCheckList(
    @Param('itemId') itemId: number,
    @Body() moveCheckItemDto: MoveCheckItemDto
  ) {
    const movedCheckItem = await this.checkItemService.moveItemWithinCheckList(
      itemId,
      moveCheckItemDto
    );
    return {
      statusCode: HttpStatus.OK,
      message: CHECK_MESSAGES.CHECKITEM.MOVE_WITHIN,
      data: movedCheckItem,
    };
  }

  @Patch(':itemId/move-to-another')
  @ApiOperation({ summary: '다른 체크리스트로 아이템 이동' })
  async moveItemToAnotherChecklist(
    @Param('itemId') itemId: number,
    @Body() moveCheckItemDto: MoveCheckItemDto
  ) {
    const movedCheckItem =
      await this.checkItemService.moveItemToAnotherChecklist(
        itemId,
        moveCheckItemDto
      );
    return {
      statusCode: HttpStatus.OK,
      message: CHECK_MESSAGES.CHECKITEM.MOVE_TO_ANOTHER,
      data: movedCheckItem,
    };
  }
}
