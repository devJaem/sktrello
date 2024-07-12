import { Card } from 'src/card/entities/card.entity';
import { CheckItem } from 'src/check_item/entities/check_item.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('check_list')
export class CheckList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
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
  deletedAt: Date | null;

  /* 체크 아이템 join */
  @OneToMany(() => CheckItem, (check_Item) => check_Item.checklist, { cascade: true})
  checkItems: CheckItem[];

  /* 카드 join */
  @ManyToOne(() => Card, (card) => card.checkLists, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'card_id' })
  card: Card;
}
