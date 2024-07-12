import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CheckListService } from './checklist.service';
import { CreateCheckListDto } from './dto/create-checklist.dto';
import { UpdateCheckListDto } from './dto/update-checklist.dto';

@Controller('check-list')
export class CheckListController {
  constructor(private readonly checkListService: CheckListService) {}

  @Post()
  create(@Body() createCheckListDto: CreateCheckListDto) {
    return this.checkListService.create(createCheckListDto);
  }

  @Get()
  findAll() {
    return this.checkListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkListService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCheckListDto: UpdateCheckListDto
  ) {
    return this.checkListService.update(+id, updateCheckListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkListService.remove(+id);
  }
}
