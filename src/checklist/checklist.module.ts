import { Module } from '@nestjs/common';
import { CheckListService } from './checklist.service';
import { CheckListController } from './checklist.controller';
import { CheckList } from './entities/checklist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from 'src/board/board.module';
import { CardModule } from 'src/card/card.module';

@Module({
  imports: [TypeOrmModule.forFeature([CheckList]), CardModule, BoardModule],
  controllers: [CheckListController],
  providers: [CheckListService],
  exports: [CheckListService],
})
export class CheckListModule {}
