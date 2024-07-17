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
import { CheckItemService } from './checkitem.service';
import { CreateCheckItemDto } from './dto/create-checkitem.dto';
import { UpdateCheckItemDto } from './dto/update-checkitem.dto';
import { MoveCheckItemDto } from './dto/move-checkitem.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CHECK_MESSAGES } from '../constants/check-message.constant';
import { CheckItem } from './entities/checkitem.entity';
import { BoardUserRolesGuard } from 'src/auth/guard/board-user-roles.guard';
import { BoardUserRoles } from 'src/auth/decorator/board-user-roles.decorator';
import { BoardUserRole } from 'src/board/types/board-user.type';
import { CheckListService } from 'src/checklist/checklist.service';

@ApiTags('6. 체크리스트-아이템 API')
@UseGuards(BoardUserRolesGuard)
@BoardUserRoles(BoardUserRole.admin, BoardUserRole.host, BoardUserRole.guest)
@ApiBearerAuth()
@Controller('/boards/:boardId/checkitems')
export class CheckItemController {
  constructor(
    private readonly checkItemService: CheckItemService,
    private readonly checkListService: CheckListService
  ) {}

  @ApiOperation({
    summary: '체크아이템 생성 API',
    description: '체크아이템을 생성합니다.',
  })
  @ApiBody({ type: CreateCheckItemDto })
  @ApiParam({ name: 'boardId', description: 'ID of the board', type: 'number' })
  @ApiResponse({ type: CheckItem, status: HttpStatus.CREATED })
  @Post()
  async create(@Body() createCheckItemDto: CreateCheckItemDto) {
    await this.checkListService.findOne(createCheckItemDto.checkListId);
    const newCheckItem = await this.checkItemService.create(createCheckItemDto);
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
  @ApiParam({ name: 'boardId', description: 'ID of the board', type: 'number' })
  @ApiResponse({ type: [CheckItem], status: HttpStatus.OK })
  @Get(':checkListId')
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
  @ApiParam({ name: 'boardId', description: 'ID of the board', type: 'number' })
  @ApiResponse({ type: CheckItem, status: HttpStatus.OK })
  @Get(':checkItemId')
  async findOne(@Param('checkItemId') id: number) {
    const checkItem = await this.checkItemService.findOne(+id);
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
  @ApiParam({ name: 'boardId', description: 'ID of the board', type: 'number' })
  @ApiBody({ type: UpdateCheckItemDto })
  @ApiResponse({ type: CheckItem, status: HttpStatus.OK })
  @Patch(':checkItemId')
  async update(
    @Param('checkItemId') id: number,
    @Body() updateCheckItemDto: UpdateCheckItemDto
  ) {
    const updatedCheckItem = await this.checkItemService.update(
      +id,
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
  @ApiParam({ name: 'boardId', description: 'ID of the board', type: 'number' })
  @ApiResponse({ status: HttpStatus.OK })
  @Delete(':checkItemId')
  async remove(@Param('checkItemId') id: number) {
    const deletedCheckItem = await this.checkItemService.remove(+id);
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
  @ApiParam({ name: 'boardId', description: 'ID of the board', type: 'number' })
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
  @ApiParam({ name: 'boardId', description: 'ID of the board', type: 'number' })
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
