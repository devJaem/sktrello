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
import { CheckListService } from './checkList.service';
import { CreateCheckListDto } from './dto/create-checkList.dto';
import { UpdateCheckListDto } from './dto/update-checkList.dto';
import { MoveCheckListDto } from './dto/move-checkList.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CHECK_MESSAGES } from '../constants/check-message.constant';
import { CheckList } from './entities/checkList.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiTags('5. 체크리스트 API')
@ApiBearerAuth()
@Controller('/checklists')
export class CheckListController {
  constructor(private readonly checkListService: CheckListService) {}

  @ApiOperation({
    summary: '체크리스트 생성',
    description: '체크리스트를 생성합니다.',
  })
  @ApiBody({ type: CreateCheckListDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CHECK_MESSAGES.CHECKLIST.CREATE,
    type: CheckList,
  })
  @Post()
  async create(@Body() createCheckListDto: CreateCheckListDto) {
    const newCheckList = await this.checkListService.create(createCheckListDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: CHECK_MESSAGES.CHECKLIST.CREATE,
      data: newCheckList,
    };
  }

  @ApiOperation({
    summary: '카드 내 체크리스트 모두 조회 API',
    description: '카드 ID를 통해 특정 카드의 체크리스트를 모두 조회 합니다.',
  })
  @ApiParam({
    name: 'cardId',
    description: 'ID of the card',
    type: 'number',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '카드 내 모든 체크리스트 조회 성공',
    type: [CheckList],
  })
  @Get(':cardId')
  async findAll(@Param('cardId') cardId: string) {
    const checklists = await this.checkListService.findAll(+cardId);
    return {
      statusCode: HttpStatus.OK,
      message: CHECK_MESSAGES.CHECKLIST.FOUND,
      data: checklists,
    };
  }

  @ApiOperation({
    summary: '특정 체크리스트 조회 API',
    description: '체크리스트 ID를 통해 특정 체크리스트를 조회합니다.',
  })
  @ApiParam({
    name: 'checkListId',
    description: 'ID of the checklist',
    type: 'number',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '특정 체크리스트 조회 성공',
    type: CheckList,
  })
  @Get(':checkListId')
  async findOne(@Param('checkListId') id: string) {
    const checkList = await this.checkListService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: CHECK_MESSAGES.CHECKLIST.FOUND,
      data: checkList,
    };
  }

  @ApiOperation({
    summary: '체크리스트 수정 API',
    description: '체크리스트를 수정합니다.',
  })
  @ApiParam({
    name: 'checkListId',
    description: 'ID of the checklist',
    type: 'number',
  })
  @ApiBody({ type: UpdateCheckListDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CHECK_MESSAGES.CHECKLIST.UPDATE,
    type: CheckList,
  })
  @Patch(':checkListId')
  async update(
    @Param('checkListId') id: string,
    @Body() updateCheckListDto: UpdateCheckListDto
  ) {
    const updatedCheckList = await this.checkListService.update(
      +id,
      updateCheckListDto
    );
    return {
      statusCode: HttpStatus.OK,
      message: CHECK_MESSAGES.CHECKLIST.UPDATE,
      data: updatedCheckList,
    };
  }

  @ApiOperation({
    summary: '체크리스트 위치 이동 API',
    description: '체크리스트를 이동합니다.',
  })
  @ApiParam({
    name: 'checkListId',
    description: 'ID of the checklist',
    type: 'number',
  })
  @ApiBody({ type: MoveCheckListDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CHECK_MESSAGES.CHECKLIST.MOVE_WITHIN,
    type: CheckList,
  })
  @Patch(':checkListId/move')
  async move(
    @Param('checkListId') id: string,
    @Body() moveCheckListDto: MoveCheckListDto
  ) {
    const movedCheckList = await this.checkListService.moveItemWithInCard(
      +id,
      moveCheckListDto
    );
    return {
      statusCode: HttpStatus.OK,
      message: CHECK_MESSAGES.CHECKLIST.MOVE_WITHIN,
      data: movedCheckList,
    };
  }

  @ApiOperation({
    summary: '체크리스트 다른 카드로 이동 API',
    description: '체크리스트를 다른 카드로 이동합니다.',
  })
  @ApiParam({
    name: 'checkListId',
    description: 'ID of the checklist',
    type: 'number',
  })
  @ApiBody({ type: MoveCheckListDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CHECK_MESSAGES.CHECKLIST.MOVE_TO_ANOTHER,
    type: CheckList,
  })
  @Patch(':checkListId/move-to-card')
  async moveToCard(
    @Param('checkListId') id: string,
    @Body() moveCheckListDto: MoveCheckListDto
  ) {
    const movedCheckList = await this.checkListService.moveListToAnotherCard(
      +id,
      moveCheckListDto
    );
    return {
      statusCode: HttpStatus.OK,
      message: CHECK_MESSAGES.CHECKLIST.MOVE_TO_ANOTHER,
      data: movedCheckList,
    };
  }

  @ApiOperation({
    summary: '체크리스트 삭제 API',
    description: '체크리스트를 삭제합니다.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CHECK_MESSAGES.CHECKLIST.DELETE,
  })
  @Delete(':checkListId')
  async remove(@Param('checkListId') id: string) {
    console.log(+id);
    const deletedCheckList = await this.checkListService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: CHECK_MESSAGES.CHECKLIST.DELETE,
      data: deletedCheckList,
    };
  }
}
