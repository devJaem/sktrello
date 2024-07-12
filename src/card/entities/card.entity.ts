import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { CardUser } from './card-user.entity';
import { CheckList } from 'src/checklist/entities/checklist.entity';
import { List } from 'src/list/entities/list.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { DuedateStatus } from '../types/duedate-status.type';

@Entity()
export class Card {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  listId: number;

  @Column()
  title: string;

  @Column()
  description: string | null;

  @Column()
  duedate: Date;

  @Column({
    type: 'enum',
    enum: DuedateStatus,
    default: DuedateStatus.uncomplete,
  })
  duedate_status: DuedateStatus;

  @Column()
  color: string;

  @Column()
  cardOrder: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;

  // 카드유저 테이블과 1:N 관계
  @OneToMany(() => CardUser, (cardUsers) => cardUsers.card, { cascade: true })
  cardUsers: CardUser[];

  //체크리스트 테이블과 1:N 관계
  @OneToMany(() => CheckList, (checkLists) => checkLists.card, {
    cascade: true,
  })
  checkLists: CheckList[];

  //코멘트 테이블과 1:N 관계
  @OneToMany(() => Comment, (comments) => comments.card, { cascade: true })
  comments: Comment[];

  // 리스트 테이블과 N:1 관계
  @ManyToOne(() => List, (list) => list.cards, { onDelete: 'CASCADE' })
  list: List;
}
