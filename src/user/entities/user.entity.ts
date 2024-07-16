import { BoardUser } from 'src/board/entities/board-user.entity';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';
import { CardUser } from 'src/card/entities/card-user.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { USER_MESSAGES } from 'src/constants/user-message.constant';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @IsNotEmpty({ message: USER_MESSAGES.USER.SIGNUP.EMAIL.EMPTY })
  @Column()
  email: string;

  @IsNotEmpty({ message: USER_MESSAGES.USER.SIGNUP.NICKNAME.EMPTY })
  @Column()
  nickname: string;

  @IsNotEmpty({ message: USER_MESSAGES.USER.SIGNUP.PASSWORD.EMPTY })
  @IsStrongPassword({ minLength: 8, minSymbols: 1 }, {})
  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;

  // Relation - [users] 1 : N [board_users]
  @OneToMany(() => BoardUser, (boardUser) => boardUser.user)
  boardUsers: BoardUser[];

  // Relation - [users] 1 : N [card_users]
  @OneToMany(() => CardUser, (cardUser) => cardUser.user)
  cardUsers: CardUser[];

  // Relation - [users] 1 : N [comments]
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
