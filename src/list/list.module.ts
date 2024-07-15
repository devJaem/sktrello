import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Board } from 'src/board/entities/board.entity';
import { BoardUser } from 'src/board/entities/board-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([List, Board, BoardUser])],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
