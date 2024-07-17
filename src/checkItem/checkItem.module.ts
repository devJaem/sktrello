import { Module } from '@nestjs/common';
import { CheckItemService } from './checkitem.service';
import { CheckItemController } from './checkitem.controller';
import { CheckItem } from './entities/checkitem.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckListModule } from 'src/checklist/checklist.module';
import { BoardModule } from 'src/board/board.module';
import { CheckList } from 'src/checklist/entities/checklist.entity';
import { BoardUser } from 'src/board/entities/board-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CheckItem, CheckList, BoardUser]),
    CheckListModule,
    BoardModule,
  ],
  controllers: [CheckItemController],
  providers: [CheckItemService],
  exports: [CheckItemService],
})
export class CheckItemModule {}
