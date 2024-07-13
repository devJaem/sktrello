import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentReporsitory: Repository<Comment>
  ) {}
  async create(
    createCommentDto: CreateCommentDto,
    userId: number,
    cardId: number
  ) {
    const { content } = createCommentDto;
    const comment = this.commentReporsitory.create({ userId, cardId, content });
    return comment;
  }

  async findAll(cardId: number) {
    return await this.commentReporsitory.find({ where: { cardId } });
  }

  async findOne(id: number) {
    // 주어진 id에 해당하는 카드 조회
    return await this.commentReporsitory.findOne({
      where: { id },
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, userId: number) {
    await this.commentReporsitory.update({ id, userId }, updateCommentDto);
    return this.findOne(id);
  }

  async remove(id: number, userId: number) {
    await this.commentReporsitory.delete({ id, userId });
    return { deleted: true };
  }
}
