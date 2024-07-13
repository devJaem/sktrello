import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardController } from './board.controller';
import { BoardService } from './board.service';

import { ListService } from 'src/list/list.service';

import { User } from 'src/user/entities/user.entity';
import { Board } from './entities/board.entity';
import { BoardUser } from './entities/board-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Board, BoardUser])],
  controllers: [BoardController],
  providers: [BoardService, ListService],
  exports: [BoardService],
})
export class BoardModule {}
