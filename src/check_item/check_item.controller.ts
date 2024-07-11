import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CheckItemService } from './check_item.service';
import { CreateCheckItemDto } from './dto/create-check_item.dto';
import { UpdateCheckItemDto } from './dto/update-check_item.dto';

@Controller('check-item')
export class CheckItemController {
  constructor(private readonly checkItemService: CheckItemService) {}

  @Post()
  create(@Body() createCheckItemDto: CreateCheckItemDto) {
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
  update(@Param('id') id: string, @Body() updateCheckItemDto: UpdateCheckItemDto) {
    return this.checkItemService.update(+id, updateCheckItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkItemService.remove(+id);
  }
}
