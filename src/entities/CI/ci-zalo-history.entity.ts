import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'df_zalo_history' })
export class CIZaloHistoryEntity {
  static ZNS_ZALO = 'zns_zalo';
  static ZNS_APPOINTMENT_TYPE = 'appointment_reminder';
  static ZNS_ORDER_REVIEW_TYPE = 'order_review';
  static ZNS_OTP_MOBA_TYPE = 'otp_moba';
  static ZNS_BIRTHDAY_TYPE = 'birthday_reminder';
  static ZNS_SUCCESS = 'success';
  static ZNS_FAIL = 'fail';
  static MONEY_SPENT = 220;
  static MONEY_FAIL = 0;
  static TYPE_APPOINTMENT_TYPE = 1;
  static TYPE_ORDER_REVIEW_TYPE = 2;
  static TYPE_BIRTHDAY_TYPE = 3;
  static TYPE_MOBA_OTP = 4;

  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  status: string;

  @Column({ name: 'type_api', type: 'varchar', length: 100 })
  type_api: string;

  @Column({ type: 'varchar', length: 100 })
  type: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @Column({ name: 'order_apt_id', type: 'varchar', length: 50 })
  order_apt_id: string;

  @Column({ type: 'varchar', length: 250 })
  error: string;

  @Column({
    name: 'money_spent',
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0,
  })
  money_spent: number;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({ name: 'branch_id', type: 'int' })
  branch_id: number;

  @Column({ name: 'created_by_id', type: 'int' })
  created_by_id: number;

  @CreateDateColumn({ name: 'created_date' })
  created_date: Date;
}
