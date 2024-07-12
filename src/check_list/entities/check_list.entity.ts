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

  @OneToMany(() => CheckItem, (check_Item) => check_Item.checklist)
  checkItems: CheckItem[];

  /* 카드 join */
  // @ManyToOne(() => Card, (card) => card.checkLists)
  // @JoinColumn({ name: 'card_id' })
  // card: Card;
  

}
