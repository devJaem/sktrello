import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CheckitemService } from './checkitem.service';
import { CreateCheckitemDto } from './dto/create-checkitem.dto';
import { UpdateCheckitemDto } from './dto/update-checkitem.dto';

@Controller('checkitems')
export class CheckitemController {
  constructor(private readonly checkItemService: CheckitemService) {}

  @Post()
  create(@Body() createCheckItemDto: CreateCheckitemDto) {
    return this.checkItemService.create(createCheckItemDto);
  }

  @Get()
  findAll() {
    return this.checkItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkItemService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCheckItemDto: UpdateCheckitemDto
  ) {
    return this.checkItemService.update(+id, updateCheckItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkItemService.remove(+id);
  }
}
