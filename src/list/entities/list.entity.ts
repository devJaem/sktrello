import { Board } from 'src/board/entities/board.entity';
import { Card } from 'src/card/entities/card.entity';
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

@Entity('lists')
export class List {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  boardId: number;

  @Column()
  title: string;

  @Column()
  listOrder: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;

  // Relation - [lists] 1 : N [cards]
  @OneToMany(() => Card, (card) => card.list, { cascade: true })
  cards: Card[];

  // Relation - [lists] N : 1 [boards]
  @ManyToOne(() => Board, (board) => board.lists, { onDelete: 'CASCADE' })
  board: Board;
}
