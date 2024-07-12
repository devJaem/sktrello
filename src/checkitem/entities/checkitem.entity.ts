import { Checklist } from 'src/checklist/entities/checklist.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('checkitem')
export class Checkitem {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  checkListId: number;

  @Column('text')
  content: string;

  @Column()
  isDone: boolean;

  @Column()
  checkItemOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;

  @ManyToOne(() => Checklist, (checklist) => checklist.checkItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  checklist: Checklist;
}
