import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { COMMENT_MESSAGE } from 'src/constants/comment.message.constants';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}
  // 댓글 생성
  async create(
    createCommentDto: CreateCommentDto,
    userId: number,
    cardId: number
  ) {
    const { content } = createCommentDto;
    const comment = this.commentRepository.save({ userId, cardId, content });
    return comment;
  }

  // 댓글 조회
  async findAll(cardId: number) {
    return await this.commentRepository.find({ where: { cardId } });
  }

  // 댓글 상세 조회
  async findOne(id: number, userId: number) {
    // 주어진 id에 해당하는 댓글 조회
    const comment = await this.commentRepository.findOne({
      where: { id, deletedAt: null },
    });
    // 댓글 작성자가 본인인지 확인
    if (userId !== comment.userId) {
      throw new ForbiddenException('권한이 없습니다.');
    }

    return comment;
  }

  // 댓글 수정
  async update(id: number, updateCommentDto: UpdateCommentDto, userId: number) {
    const comment = await this.commentRepository.findOne({
      where: { id, deletedAt: null },
    });

    // 댓글이 존재하는지 확인
    if (!comment) {
      throw new NotFoundException(
        COMMENT_MESSAGE.COMMENT.READ_DETAIL.NOT_FOUND
      );
    }

    // 댓글 작성자가 본인인지 확인
    if (userId !== comment.userId) {
      throw new ForbiddenException('권한이 없습니다.');
    }

    await this.commentRepository.update({ id, userId }, updateCommentDto);
    return this.findOne(id, userId);
  }

  // 댓글 삭제
  async remove(id: number, userId: number) {
    const comment = await this.commentRepository.findOne({
      where: { id, deletedAt: null },
    });
    // 댓글이 존재하는지 확인
    if (!comment) {
      throw new NotFoundException(
        COMMENT_MESSAGE.COMMENT.READ_DETAIL.NOT_FOUND
      );
    }
    // 댓글 작성자가 본인인지 확인
    if (userId !== comment.userId) {
      throw new ForbiddenException('권한이 없습니다.');
    }
    await this.commentRepository.softDelete({ id });
    return { deleted: true };
  }
}
