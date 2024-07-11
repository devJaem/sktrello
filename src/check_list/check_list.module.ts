import { Module } from '@nestjs/common';
import { CheckListService } from './check_list.service';
import { CheckListController } from './check_list.controller';

@Module({
  controllers: [CheckListController],
  providers: [CheckListService],
})
export class CheckListModule {}
