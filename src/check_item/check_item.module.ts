import { Module } from '@nestjs/common';
import { CheckItemService } from './check_item.service';
import { CheckItemController } from './check_item.controller';
import { CheckItem } from './entities/check_item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckListModule } from 'src/check_list/check_list.module';

@Module({
  imports: [TypeOrmModule.forFeature([CheckItem]), CheckListModule],
  controllers: [CheckItemController],
  providers: [CheckItemService],
  exports: [CheckItemService],
})
export class CheckItemModule {}
