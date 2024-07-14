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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MESSAGES } from '../constants/check-message.constats'; // 메시지 상수 파일 가져오기

@Controller('checklists/:checklistId/items')
export class CheckItemController {
  constructor(private readonly checkItemService: CheckItemService) {}

  @Post()
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
      message: MESSAGES.CHECKITEM.CREATE,
      data: newCheckItem,
    };
  }

  @Get()
  async findAll(@Param('checklistId') checklistId: number) {
    const checkItems = await this.checkItemService.findAll(checklistId);
    return {
      statusCode: HttpStatus.OK,
      data: checkItems,
    };
  }

  @Get(':itemId')
  async findOne(@Param('itemId') itemId: number) {
    const checkItem = await this.checkItemService.findOne(itemId);
    return {
      statusCode: HttpStatus.OK,
      data: checkItem,
    };
  }

  @Patch(':itemId')
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
      message: MESSAGES.CHECKITEM.UPDATE,
      data: updatedCheckItem,
    };
  }

  @Delete(':itemId')
  async remove(@Param('itemId') itemId: number) {
    const deletedCheckItem = await this.checkItemService.remove(itemId);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.CHECKITEM.DELETE,
      data: deletedCheckItem,
    };
  }

  @Patch(':itemId/move')
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
      message: MESSAGES.CHECKITEM.MOVE_WITHIN,
      data: movedCheckItem,
    };
  }

  @Patch(':itemId/move-to-another')
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
      message: MESSAGES.CHECKITEM.MOVE_TO_ANOTHER,
      data: movedCheckItem,
    };
  }
}
