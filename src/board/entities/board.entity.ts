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
import { List } from 'src/list/entities/list.entity';

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
  deletedAt?: Date | null;

  // Relation - [boards] 1 : N [board_users]
  @OneToMany(() => BoardUser, (boardUser) => boardUser.board, { cascade: true })
  boardUsers: BoardUser[];

  // Relation - [boards] 1 : N [lists]
  @OneToMany(() => List, (list) => list.board, { cascade: true })
  lists: List[];
}
