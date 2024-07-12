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
import { CheckList } from 'src/check_list/entities/check_list.entity';
import { List } from 'src/list/entities/list.entity';
import { DuedateStatus } from '../types/duedate-status.type';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  //   @ManyToOne(()=> List, list => list.card)
  //   list: List;

  @Column()
  listId: number;

  @Column()
  title: string;

  @Column()
  description: string | null;

  @Column()
  duedate: Date;

  @Column({ type: 'enum', enum: DuedateStatus, default: DuedateStatus.uncomplete })
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
  deletedAt: Date | null;

  @OneToMany(() => CardUser, (cardUser) => cardUser.card)
  cardUser: CardUser[];

  //   @OneToMany(() => CheckList, checklist => checklist.card)
  //   checklist: CheckList[];
}
