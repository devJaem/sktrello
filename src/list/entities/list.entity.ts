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

  //cards 테이블과 1:N 관계
  @OneToMany(() => Card, (card) => card.list, { cascade: true })
  cards: Card[];

  //boards 테이블과 N:1 관계
  @ManyToOne(() => Board, (board) => board.lists, { onDelete: 'CASCADE' })
  board: Board;
}
