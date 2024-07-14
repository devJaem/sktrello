import _ from 'lodash';
import { CreateCheckItemDto } from './dto/create-checkItem.dto';
import { UpdateCheckItemDto } from './dto/update-checkItem.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckItem } from './entities/checkItem.entity';
import { DataSource, Repository } from 'typeorm';
import { LexoRank } from 'lexorank';

@Injectable()
export class CheckItemService {
  constructor(
    @InjectRepository(CheckItem)
    private readonly checkItemRepository: Repository<CheckItem>,
    private readonly dataSource: DataSource
  ) {}

  async create(createCheckItemDto: CreateCheckItemDto) {
    const { checkListId, content } = createCheckItemDto;

    const lasCheckItem = await this.checkItemRepository.findOne({
      where: { checkListId },
      order: { checkItemOrder: 'DESC' },
    });

    let order = LexoRank.middle();
    if (lasCheckItem) {
      const lastOrder = LexoRank.parse(lasCheckItem.checkItemOrder);
      order = lastOrder.genNext();
    }

    const newCheckItem = this.checkItemRepository.create({
      checkListId,
      content,
      checkItemOrder: order.toString(),
    });
    await this.checkItemRepository.save(newCheckItem);
    return newCheckItem;
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
