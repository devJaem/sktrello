import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Card } from './card.entity';

@Entity()
export class CardUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cardId: number;

  // 카드 테이블과 N:1관계
  @ManyToOne(() => Card, (card) => card.cardUser, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cardId' })
  card: Card;

  //   @ManyToOne(() => User, user => user.cardUsers)
  //   @JoinColumn({ name: 'userId' })
  //   user: User;
}
