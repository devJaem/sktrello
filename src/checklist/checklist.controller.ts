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
import { CheckListService } from './checkList.service';
import { CreateCheckListDto } from './dto/create-checkList.dto';
import { UpdateCheckListDto } from './dto/update-checkList.dto';
import { MoveCheckListDto } from './dto/move-checkList.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CHECK_MESSAGES } from '../constants/check-message.constant';

@Controller('checkLists')
@ApiTags('체크리스트 API')
export class CheckListController {
  constructor(private readonly checkListService: CheckListService) {}

  @Post()
  @ApiOperation({ summary: '체크리스트 생성' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CHECK_MESSAGES.CHECKLIST.CREATE,
  })
  async create(@Body() createCheckListDto: CreateCheckListDto) {
    const newCheckList = await this.checkListService.create(createCheckListDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: CHECK_MESSAGES.CHECKLIST.CREATE,
      data: newCheckList,
    };
  }

  @Get(':cardId')
  @ApiOperation({ summary: '체크리스트 전체 조회' })
  async findAll(@Param('cardId') cardId: string) {
    const checklists = await this.checkListService.findAll(+cardId);
    return {
      statusCode: HttpStatus.OK,
      data: checklists,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: '체크리스트 단일 조회' })
  async findOne(@Param('id') id: string) {
    const checkList = await this.checkListService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      data: checkList,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: '체크리스트 수정' })
  async update(
    @Param('id') id: string,
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

  @Patch(':id/move')
  @ApiOperation({ summary: '체크리스트 순서 이동' })
  async move(
    @Param('id') id: string,
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

  @Patch(':id/move-to-card')
  @ApiOperation({ summary: '다른 카드로 체크리스트 이동' })
  async moveToCard(
    @Param('id') id: string,
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

  @Delete(':id')
  @ApiOperation({ summary: '체크리스트 삭제' })
  async remove(@Param('id') id: string) {
    const deletedCheckList = await this.checkListService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: CHECK_MESSAGES.CHECKLIST.DELETE,
      data: deletedCheckList,
    };
  }
}
