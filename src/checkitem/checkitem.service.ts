import { Injectable } from '@nestjs/common';
import { CreateCheckitemDto } from './dto/create-checkitem.dto';
import { UpdateCheckitemDto } from './dto/update-checkitem.dto';

@Injectable()
export class CheckitemService {
  create(createCheckItemDto: CreateCheckitemDto) {
    return 'This action adds a new checkItem';
  }

  findAll() {
    return `This action returns all checkItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkItem`;
  }

  update(id: number, updateCheckItemDto: UpdateCheckitemDto) {
    return `This action updates a #${id} checkItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkItem`;
  }
}
