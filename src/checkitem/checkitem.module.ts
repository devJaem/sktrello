import { Module } from '@nestjs/common';
import { CheckItemService } from './checkitem.service';
import { CheckItemController } from './checkitem.controller';
import { CheckItem } from './entities/checkitem.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckListModule } from 'src/check_list/check_list.module';
import { BoardModule } from 'src/board/board.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CheckItem]),
    CheckListModule,
    BoardModule,
  ],
  controllers: [CheckItemController],
  providers: [CheckItemService],
  exports: [CheckItemService],
})
export class CheckItemModule {}
