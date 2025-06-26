import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'organizations' })
export class OrganizationEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  subdomain: string;

  @Column({ type: 'varchar', length: 255, default: 'myspa.vn' })
  domain: string;

  @Column({ name: 'db_name', type: 'varchar', length: 255 })
  dbName: string;

  @Column({ type: 'longtext', nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 255, default: '0' })
  latitude: string;

  @Column({ type: 'varchar', length: 255, default: '0' })
  longitude: string;

  @Column({ type: 'longtext', nullable: true })
  telephone?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address?: string;

  @Column({ name: 'company_id', type: 'bigint', unsigned: true })
  companyId: string;

  @Column({ name: 'min_price', type: 'double', default: 0 })
  minPrice: number;

  @Column({ name: 'max_price', type: 'double', default: 0 })
  maxPrice: number;

  @Column({ type: 'text', nullable: true })
  image?: string;

  @Column({
    name: 'is_momo_ecommerce_enable',
    type: 'tinyint',
    width: 1,
    default: () => '0',
  })
  isMomoEcommerceEnable: boolean;

  @Column({
    name: 'is_moba_register_requested',
    type: 'tinyint',
    width: 1,
    default: () => '0',
  })
  isMobaRegisterRequested: boolean;

  @Column({
    name: 'opening_status',
    type: 'tinyint',
    width: 1,
    default: () => '1',
  })
  openingStatus: boolean;

  @Column({ name: 'opening_time', type: 'longtext', nullable: true })
  openingTime?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @Column({
    name: 'province_code',
    type: 'bigint',
    unsigned: true,
    nullable: true,
  })
  provinceCode?: string;

  @Column({
    name: 'district_code',
    type: 'bigint',
    unsigned: true,
    nullable: true,
  })
  districtCode?: string;

  @Column({ name: 'ward_code', type: 'bigint', unsigned: true, nullable: true })
  wardCode?: string;

  @Column({ type: 'int', default: 0 })
  priority: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  timezone?: string;

  @Column({ name: 'is_demo', type: 'tinyint', width: 1, default: () => '0' })
  isDemo: boolean;

  @Column({ type: 'longtext', nullable: true })
  description?: string;

  @Column({
    name: 'mc_user_id',
    type: 'bigint',
    unsigned: true,
    nullable: true,
  })
  mcUserId?: string;

  @Column({ type: 'longtext', nullable: true })
  content?: string;
}
