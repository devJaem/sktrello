import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { BoardUser } from './board-user.entity';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  title: string;

  @Column()
  color: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  // [board_users] 테이블과의 관계 1:N
  @OneToMany(() => BoardUser, (boardUser) => boardUser.board, { cascade: true })
  boardUsers: BoardUser[];

  // [lists] 테이블과의 관계 1:N
  // 파일 합치면 추가할 것 ***
}
