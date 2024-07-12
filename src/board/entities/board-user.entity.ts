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
import { User } from 'src/user/entities/user.entity';
import { BoardUserRole } from '../types/board-user.type';

@Entity('board_users')
export class BoardUser {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  boardId: number;

  @Column({ unsigned: true })
  userId: number;

  @Column({ default: 'GUEST' })
  boardUserRole: BoardUserRole;

  @Column({ default: false })
  isAccepted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;

  // [boards] 테이블과의 관계 N:1
  @ManyToOne(() => Board, (board) => board.boardUsers, { onDelete: 'CASCADE' })
  board: Board;

  // [users] 테이블과의 관계 N:1
  @ManyToOne(() => User, (user) => user.boardUsers)
  user: User;
}
