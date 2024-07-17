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

  // Relation - [cards] 1 : N [card_users]
  @OneToMany(() => CardUser, (cardUser) => cardUser.card, { cascade: true })
  cardUsers: CardUser[];

  // Relation - [cards] 1 : N [check_lists]
  @OneToMany(() => CheckList, (checkList) => checkList.card, {
    cascade: true,
  })
  checkLists: CheckList[];

  // Relation - [cards] 1 : N [comments]
  @OneToMany(() => Comment, (comment) => comment.card, { cascade: true })
  comments: Comment[];

  // Relation - [cards] N : 1 [lists]
  @ManyToOne(() => List, (list) => list.cards, { onDelete: 'CASCADE' })
  list: List;
}
