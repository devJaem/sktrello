import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Checklist } from './entities/checklist.entity';
import { DataSource, Repository } from 'typeorm';
import { LexoRank } from 'lexorank';

@Injectable()
export class ChecklistService {
  constructor(
    @InjectRepository(Checklist)
    private readonly checklistRepository: Repository<Checklist>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createChecklistDto: CreateChecklistDto) {
    const { cardId, title } = createChecklistDto;

    const lastChecklist = await this.checklistRepository.findOne({
      where: { cardId },
      order: { checklistOrder: 'DESC'},
    });

    let order = LexoRank.middle();
    if (lastChecklist){
      const lastOrder = LexoRank.parse(lastChecklist.checklistOrder);
      order = lastOrder.genNext();
    }

    const newChecklist = this.checklistRepository.create({ cardId, title, checklistOrder: order.toString() });
    await this.checklistRepository.save(newChecklist);
    return newChecklist;
  }

  findAll() {
    return `This action returns all checkList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkList`;
  }

  update(id: number, updateChecklistDto: UpdateChecklistDto) {
    return `This action updates a #${id} checkList`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkList`;
  }
}
