import { Card } from 'src/card/entities/card.entity';
import { CheckItem } from 'src/check_item/entities/check_item.entity';
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

@Entity('check_list')
export class CheckList {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  cardId: number;

  @Column()
  title: string;

  @Column()
  checkListOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;

  // Relation - [check_lists] 1 : N [check_items]
  @OneToMany(() => CheckItem, (checkItem) => checkItem.checklist, {
    cascade: true,
  })
  checkItems: CheckItem[];

  // Relation - [check_lists] N : 1 [cards]
  @ManyToOne(() => Card, (card) => card.checkLists, { onDelete: 'CASCADE' })
  card: Card;
}
