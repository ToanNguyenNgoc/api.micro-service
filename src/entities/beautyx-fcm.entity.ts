import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'beautyx_fcm' })
export class BeautyXFcmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  fcm_token: string;

  @Column()
  user_id: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
