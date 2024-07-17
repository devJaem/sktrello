import { Module } from '@nestjs/common';
import { CheckListService } from './checkList.service';
import { CheckListController } from './checkList.controller';
import { CheckList } from './entities/checkList.entity';
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
