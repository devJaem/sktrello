import { Module } from '@nestjs/common';
import { CheckListService } from './check_list.service';
import { CheckListController } from './check_list.controller';
import { CheckList } from './entities/check_list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CheckList])],
  controllers: [CheckListController],
  providers: [CheckListService],
  exports: [CheckListService],
})
export class CheckListModule {}
