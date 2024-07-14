import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { CreateCheckListDto } from './dto/create-checkList.dto';
import { UpdateCheckListDto } from './dto/update-checkList.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckList } from './entities/checkList.entity';
import { DataSource, Repository } from 'typeorm';
import { LexoRank } from 'lexorank';

@Injectable()
export class CheckListService {
  constructor(
    @InjectRepository(CheckList)
    private readonly checkListRepository: Repository<CheckList>,
    private readonly dataSource: DataSource
  ) {}

  async create(createCheckListDto: CreateCheckListDto) {
    const { cardId, title } = createCheckListDto;

    const lastCheckList = await this.checkListRepository.findOne({
      where: { cardId },
      order: { checkListOrder: 'DESC' },
    });

    let order = LexoRank.middle();
    if (lastCheckList) {
      const lastOrder = LexoRank.parse(lastCheckList.checkListOrder);
      order = lastOrder.genNext();
    }

    const newCheckList = this.checkListRepository.create({
      cardId,
      title,
      checkListOrder: order.toString(),
    });
    await this.checkListRepository.save(newCheckList);
    return newCheckList;
  }

  findAll() {
    return `This action returns all checkList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkList`;
  }

  update(id: number, updateCheckListDto: UpdateCheckListDto) {
    return `This action updates a #${id} checkList`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkList`;
  }
}
