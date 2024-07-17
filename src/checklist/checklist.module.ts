import { Module } from '@nestjs/common';
import { CheckListService } from './checklist.service';
import { CheckListController } from './checklist.controller';
import { CheckList } from './entities/checklist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from 'src/board/board.module';
import { CardModule } from 'src/card/card.module';
import { Card } from 'src/card/entities/card.entity';
import { BoardUser } from 'src/board/entities/board-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CheckList, Card, BoardUser]),
    CardModule,
    BoardModule,
  ],
  controllers: [CheckListController],
  providers: [CheckListService],
  exports: [CheckListService],
})
export class CheckListModule {}
