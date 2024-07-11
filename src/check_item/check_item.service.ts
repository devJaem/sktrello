import { Injectable } from '@nestjs/common';
import { CreateCheckItemDto } from './dto/create-check_item.dto';
import { UpdateCheckItemDto } from './dto/update-check_item.dto';

@Injectable()
export class CheckItemService {
  create(createCheckItemDto: CreateCheckItemDto) {
    return 'This action adds a new checkItem';
  }

  findAll() {
    return `This action returns all checkItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkItem`;
  }

  update(id: number, updateCheckItemDto: UpdateCheckItemDto) {
    return `This action updates a #${id} checkItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkItem`;
  }
}
