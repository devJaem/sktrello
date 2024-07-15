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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CHECK_MESSAGES } from '../constants/check-message.constant';
import { CheckItem } from './entities/checkItem.entity';

@ApiTags('체크리스트-아이템 API')
@Controller('/checklists')
export class CheckItemController {
  constructor(private readonly checkItemService: CheckItemService) {}

  @ApiOperation({
    summary: '체크아이템 생성 API',
    description: '체크아이템을 생성합니다.',
  })
  @ApiBody({ type: CreateCheckItemDto })
  @ApiParam({
    name: 'checklistId',
    description: 'ID of the checklist',
    type: 'number',
  })
  @ApiResponse({ type: CheckItem, status: HttpStatus.CREATED })
  @Post(':checklistId/items')
  async create(
    @Param('checklistId') checklistId: number,
    @Body() createCheckItemDto: CreateCheckItemDto
  ) {
    const newCheckItem = await this.checkItemService.create(
      createCheckItemDto,
      checklistId
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: CHECK_MESSAGES.CHECKITEM.CREATE,
      data: newCheckItem,
    };
  }

  @ApiOperation({
    summary: '체크아이템 모두 조회 API',
    description: '특정 체크리스트 ID를 통해 체크아이템을 조회합니다.',
  })
  @ApiParam({
    name: 'checklistId',
    description: 'ID of the checklist',
    type: 'number',
  })
  @ApiResponse({ type: [CheckItem], status: HttpStatus.OK })
  @Get(':checklistId/items')
  async findAll(@Param('checklistId') checklistId: number) {
    const checkItems = await this.checkItemService.findAll(checklistId);
    return {
      statusCode: HttpStatus.OK,
      message: CHECK_MESSAGES.CHECKITEM.FOUND,
      data: checkItems,
    };
  }

  @ApiOperation({
    summary: '체크아이템 조회 API',
    description: '체크아이템 ID를 통해 특정 체크아이템을 조회합니다.',
  })
  @ApiParam({
    name: 'checklistId',
    description: 'ID of the checklist',
    type: 'number',
  })
  @ApiParam({
    name: 'itemId',
    description: 'ID of the check item',
    type: 'number',
  })
  @ApiResponse({ type: CheckItem, status: HttpStatus.OK })
  @Get(':checklistId/items/:itemId')
  async findOne(@Param('itemId') itemId: number) {
    const checkItem = await this.checkItemService.findOne(itemId);
    return {
      statusCode: HttpStatus.OK,
      message: CHECK_MESSAGES.CHECKITEM.FOUND,
      data: checkItem,
    };
  }

  @ApiOperation({
    summary: '체크아이템 수정 API',
    description: '체크아이템을 수정합니다.',
  })
  @ApiParam({
    name: 'checklistId',
    description: 'ID of the checklist',
    type: 'number',
  })
  @ApiParam({
    name: 'itemId',
    description: 'ID of the check item',
    type: 'number',
  })
  @ApiBody({ type: UpdateCheckItemDto })
  @ApiResponse({ type: CheckItem, status: HttpStatus.OK })
  @Patch(':checklistId/items/:itemId')
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

  @ApiOperation({
    summary: '체크아이템 삭제 API',
    description: '체크아이템을 삭제합니다.',
  })
  @ApiParam({
    name: 'checklistId',
    description: 'ID of the checklist',
    type: 'number',
  })
  @ApiParam({
    name: 'itemId',
    description: 'ID of the check item',
    type: 'number',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @Delete(':checklistId/items/:itemId')
  async remove(@Param('itemId') itemId: number) {
    const deletedCheckItem = await this.checkItemService.remove(itemId);
    return {
      statusCode: HttpStatus.OK,
      message: CHECK_MESSAGES.CHECKITEM.DELETE,
      data: deletedCheckItem,
    };
  }

  @ApiOperation({
    summary: '체크리스트 내의 아이템 이동 API',
    description: '체크리스트 내에서 아이템을 이동합니다.',
  })
  @ApiParam({
    name: 'checklistId',
    description: 'ID of the checklist',
    type: 'number',
  })
  @ApiParam({
    name: 'itemId',
    description: 'ID of the check item',
    type: 'number',
  })
  @ApiBody({ type: MoveCheckItemDto })
  @ApiResponse({ type: CheckItem, status: HttpStatus.OK })
  @Patch(':checklistId/items/:itemId/move')
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

  @ApiOperation({
    summary: '다른 체크리스트로 아이템 이동 API',
    description: '다른 체크리스트로 아이템을 이동합니다.',
  })
  @ApiParam({
    name: 'checklistId',
    description: 'ID of the checklist',
    type: 'number',
  })
  @ApiParam({
    name: 'itemId',
    description: 'ID of the check item',
    type: 'number',
  })
  @ApiBody({ type: MoveCheckItemDto })
  @ApiResponse({ type: CheckItem, status: HttpStatus.OK })
  @Patch(':checklistId/items/:itemId/move-to-checklist')
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
