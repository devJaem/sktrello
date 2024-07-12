import { Card } from 'src/card/entities/card.entity';
import { Checkitem } from 'src/checkitem/entities/checkitem.entity';
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

@Entity('checklist')
export class Checklist {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  cardId: number;

  @Column()
  title: string;

  @Column()
  checklistOrder: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;

  /* 체크 아이템 join */
  @OneToMany(() => Checkitem, (checkitem) => checkitem.checklist, {
    cascade: true,
  })
  checkItems: Checkitem[];

  /* 카드 join */
  @ManyToOne(() => Card, (card) => card.checklists, { onDelete: 'CASCADE' })
  card: Card;
}
