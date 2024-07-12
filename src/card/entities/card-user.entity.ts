import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Card } from './card.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class CardUser {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  cardId: number;

  @Column({ unsigned: true })
  userId: number;

  // 카드 테이블과 N:1관계
  @ManyToOne(() => Card, (card) => card.cardUsers, { onDelete: 'CASCADE' })
  card: Card;

  // 유저 테이블과 N:1관계
  @ManyToOne(() => User, (user) => user.cardUsers)
  user: User;
}
