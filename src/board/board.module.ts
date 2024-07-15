import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardController } from './board.controller';
import { BoardService } from './board.service';

import { User } from 'src/user/entities/user.entity';
import { Board } from './entities/board.entity';
import { BoardUser } from './entities/board-user.entity';

import { ListModule } from 'src/list/list.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Board, BoardUser]), ListModule],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [BoardService],
})
export class BoardModule {}
