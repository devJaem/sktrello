import { CheckList } from 'src/checklist/entities/checklist.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('check_items')
export class CheckItem {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  checkListId: number;

  @Column('text')
  content: string;

  @Column()
  isDone: boolean;

  @Column()
  checkItemOrder: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;

  @ManyToOne(() => CheckList, (checkList) => checkList.checkItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  checkList: CheckList;
}
