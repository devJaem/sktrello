import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  // boardUser와의 관계
  // @OneToMany(() => BoardUser, (boardUser) => boardUser.user_id, { onDelete : 'CASCADE'})
  // boardUsers : boardUser[]

  // cardUser와의 관계
  // @OneToMany(() => CardUser, (cardUser) => cardUser.user_id, {onDelete : 'CASCADE'})
  // cardUsers : cardUser[]

  // comment와의 관계
  // @OneToMany(() => Comment, (comment) => comment.user_id, {onDelete : 'CASCADE'})
  // comment : comment[]
}
