import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'df_zalo_money' })
export class CIZaloMoneyEntity {
  static PAY_IN = 0;
  static PAY_OUT = 1;
  static MONEY_SPENT = 220;
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  type: number;

  @Column()
  zalo_history_id: number;

  @Column()
  oa_id: number;

  @Column()
  money_before: number;

  @Column()
  money_after: number;

  @Column()
  money_volatile: number;

  @CreateDateColumn({ name: 'created_date' })
  created_date: Date;

  @Column()
  branch_id: number;

  @Column()
  created_by_id: number;
}
