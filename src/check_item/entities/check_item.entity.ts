import { CheckList } from 'src/check_list/entities/check_list.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('check_item')
export class CheckItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
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
  deletedAt: Date | null;

  @ManyToOne(() => CheckList, (checklist) => checklist.checkItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'check_list_id', referencedColumnName: 'id' }])
  checklist: CheckList;
}
