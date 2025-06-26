import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'beautyx_settings' })
export class BeautyxSettingEntity extends BaseEntity {
  @Column({ nullable: false })
  key: string;

  @Column({ nullable: false })
  value: string;

  @Column({ nullable: false, default: true })
  is_active: string;
}
