import { BoardUser } from 'src/board/entities/board-user.entity';
import { CardUser } from 'src/card/entities/card-user.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;

  // boardUser와의 관계
  @OneToMany(() => BoardUser, (boardUser) => boardUser.user)
  boardUsers: BoardUser[];

  // cardUser와의 관계
  @OneToMany(() => CardUser, (cardUser) => cardUser.user)
  cardUsers: CardUser[];

  // comment와의 관계
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
