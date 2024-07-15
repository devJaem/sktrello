import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardController } from './card.controller';
import { Card } from './entities/card.entity';
import { CardService } from './card.service';
import { List } from 'src/list/entities/list.entity';
import { CheckList } from 'src/checkList/entities/checkList.entity';
import { CardUser } from './entities/card-user.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { BoardUser } from 'src/board/entities/board-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Card,
      BoardUser,
      List,
      Comment,
      CheckList,
      CardUser,
    ]),
  ],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
