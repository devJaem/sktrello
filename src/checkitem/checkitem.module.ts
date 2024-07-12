import { Module } from '@nestjs/common';
import { CheckitemService } from './checkitem.service';
import { CheckitemController } from './checkitem.controller';
import { Checkitem } from './entities/checkitem.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChecklistModule } from 'src/checklist/checklist.module';
import { BoardModule } from 'src/board/board.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Checkitem]),
    ChecklistModule,
    BoardModule,
  ],
  controllers: [CheckitemController],
  providers: [CheckitemService],
  exports: [CheckitemService],
})
export class CheckitemModule {}
