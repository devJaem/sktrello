import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Card } from './card.entity';

@Entity()
export class CardUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cardId: number;

  @ManyToOne(() => Card, (card) => card.cardUser)
  @JoinColumn({ name: 'cardId' })
  card: Card;

  //   @ManyToOne(() => User, user => user.cardUsers)
  //   @JoinColumn({ name: 'userId' })
  //   user: User;
}
