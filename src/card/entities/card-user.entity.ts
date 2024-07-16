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

  // Relation - [card_users] N : 1 [cards]
  @ManyToOne(() => Card, (card) => card.cardUsers, { onDelete: 'CASCADE' })
  card: Card;

  // Relation - [card_users] N : 1 [users]
  @ManyToOne(() => User, (user) => user.cardUsers)
  user: User;
}
