import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { Board } from './board.entity';

@Entity('board_users')
export class BoardUser {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  boardId: number;

  @Column()
  userId: number;

  @Column()
  host: boolean;

  @Column()
  isAccept: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  // [boards] 테이블과의 관계 N:1
  @ManyToOne(() => Board, (board) => board.boardUsers, { onDelete: 'CASCADE' })
  board: Board;

  // [users] 테이블과의 관계 N:1
  // 파일 합쳐지면 추가할 것
}
