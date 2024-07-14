import { Card } from 'src/card/entities/card.entity';
import { CheckItem } from 'src/checkItem/entities/checkItem.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('checkList')
export class CheckList {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  cardId: number;

  @Column()
  title: string;

  @Column()
  checkListOrder: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;

  /* 체크 아이템 join */
  @OneToMany(() => CheckItem, (checkItem) => checkItem.checkList, {
    cascade: true,
  })
  checkItems: CheckItem[];

  /* 카드 join */
  @ManyToOne(() => Card, (card) => card.checkLists, { onDelete: 'CASCADE' })
  card: Card;
}
