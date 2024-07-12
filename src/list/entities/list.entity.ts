import { Board } from 'src/board/entities/board.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('lists')
export class List {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
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
  deletedAt: Date | null;

  // boards 테이블과 N:1 관계
  // @ManyToOne(() => Board, (board) => board.lists, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // board: Board;
}
