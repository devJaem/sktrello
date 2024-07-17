import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from 'src/board/board.module';
import { BoardUser } from 'src/board/entities/board-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, BoardUser]), BoardModule],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
