import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Board } from 'src/board/entities/board.entity';
import { BoardUser } from 'src/board/entities/board-user.entity';
import { CardModule } from 'src/card/card.module';
import { Card } from 'src/card/entities/card.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([List, Board, BoardUser, Card]),
    CardModule,
  ],
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService],
})
export class ListModule {}
