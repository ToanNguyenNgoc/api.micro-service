import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user_zns_opts' })
export class UserZaloOtpEntity extends BaseEntity {
  @Column({ nullable: false })
  telephone: string;

  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false, default: false })
  used: boolean;
}
