import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Card } from './card.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class CardUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cardId: number;

  @Column()
  userId: number;

  // 카드 테이블과 N:1관계
  @ManyToOne(() => Card, (card) => card.cardUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'card_id' })
  card: Card;

  // 유저 테이블과 N:1관계
  @ManyToOne(() => User, (user) => user.cardUsers)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
