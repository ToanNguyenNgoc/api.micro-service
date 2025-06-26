import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'df_zalo_config' })
export class CIZaloConfigEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 500 })
  token: string;

  @Column({ type: 'tinyint', width: 1, default: () => '1' })
  active: boolean;

  @CreateDateColumn({ name: 'created_date', type: 'datetime' })
  createdDate: Date;

  @Column({ name: 'created_by_id', type: 'int' })
  createdById: number;

  @Column({ name: 'app_id', type: 'varchar', length: 50, nullable: true })
  appId?: string;

  @Column({ name: 'app_secret', type: 'varchar', length: 50, nullable: true })
  appSecret?: string;

  @Column({ name: 'refresh_token', type: 'text', nullable: true })
  refreshToken?: string;

  @Column({
    name: 'order_template_id',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  orderTemplateId?: string;

  @Column({
    name: 'apt_template_id',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  aptTemplateId?: string;

  @Column({
    name: 'main_account_template_id',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  mainAccountTemplateId?: string;

  @Column({
    name: 'treatment_card_template_id',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  treatmentCardTemplateId?: string;

  @Column({
    name: 'bonus_account_template_id',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  bonusAccountTemplateId?: string;

  @Column({
    name: 'use_treatment_card_template_id',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  useTreatmentCardTemplateId?: string;

  @Column({
    name: 'prepaid_card_template_id',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  prepaidCardTemplateId?: string;

  @Column({
    name: 'is_apt_zalo',
    type: 'tinyint',
    width: 1,
    default: () => '0',
  })
  isAptZalo: boolean;

  @Column({
    name: 'is_order_zalo',
    type: 'tinyint',
    width: 1,
    default: () => '0',
  })
  isOrderZalo: boolean;

  @Column({
    name: 'is_main_account_zalo',
    type: 'tinyint',
    width: 1,
    default: () => '0',
  })
  isMainAccountZalo: boolean;

  @Column({
    name: 'is_treatment_card_zalo',
    type: 'tinyint',
    width: 1,
    default: () => '0',
  })
  isTreatmentCardZalo: boolean;

  @Column({
    name: 'is_bonus_account_zalo',
    type: 'tinyint',
    width: 1,
    default: () => '0',
  })
  isBonusAccountZalo: boolean;

  @Column({
    name: 'is_use_treatment_card_zalo',
    type: 'tinyint',
    width: 1,
    default: () => '0',
  })
  isUseTreatmentCardZalo: boolean;

  @Column({
    name: 'is_prepaid_card_zalo',
    type: 'tinyint',
    width: 1,
    default: () => '0',
  })
  isPrepaidCardZalo: boolean;

  @Column({
    name: 'code_verified',
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  codeVerified?: string;

  @Column({
    name: 'apt_online_template_id',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  aptOnlineTemplateId?: string;

  @Column({
    name: 'is_apt_online_zalo',
    type: 'tinyint',
    width: 1,
    default: () => '0',
  })
  isAptOnlineZalo: boolean;

  @Column({
    name: 'is_order_review_zalo',
    type: 'tinyint',
    width: 1,
    default: () => '0',
  })
  isOrderReviewZalo: boolean;

  @Column({ name: 'oa_id', type: 'varchar', length: 255 })
  oaId: number;

  @Column({
    name: 'apt_reminder_template_id',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  aptReminderTemplateId?: string;

  @Column({
    name: 'birthday_reminder_template_id',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  birthdayReminderTemplateId?: string;

  @Column({
    name: 'is_apt_reminder_zalo',
    type: 'tinyint',
    width: 1,
    default: () => '0',
  })
  isAptReminderZalo: boolean;

  @Column({
    name: 'is_birthday_reminder_zalo',
    type: 'tinyint',
    width: 1,
    default: () => '0',
  })
  isBirthdayReminderZalo: boolean;

  @Column({
    name: 'order_debt_template_id',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  orderDebtTemplateId?: string;

  @Column({ name: 'time_reminder_apt', type: 'int', nullable: true })
  timeReminderApt?: number;

  @Column({
    name: 'type_time_apt',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  typeTimeApt?: string;

  @Column({ name: 'time_notification_order', type: 'int', nullable: true })
  timeNotificationOrder?: number;

  @Column({
    name: 'type_time_order',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  typeTimeOrder?: string;

  @Column({
    name: 'is_notification_order',
    type: 'tinyint',
    width: 1,
    default: () => '0',
  })
  isNotificationOrder: boolean;

  @Column({ name: 'send_slack', type: 'tinyint', width: 1, default: () => '0' })
  sendSlack: boolean;

  @Column({
    name: 'agency_order_template_id',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  agencyOrderTemplateId?: string;

  @Column({
    name: 'is_agency_order_zalo',
    type: 'tinyint',
    width: 1,
    default: () => '0',
  })
  isAgencyOrderZalo: boolean;

  @Column({
    name: 'order_review_template_id',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  orderReviewTemplateId?: string;

  @Column({
    name: 'promo_service_template_id',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  promoServiceTemplateId?: string;

  @Column({
    name: 'promo_total_template_id',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  promoTotalTemplateId?: string;

  @Column({
    name: 'is_promotion_zalo',
    type: 'tinyint',
    width: 1,
    default: () => '0',
  })
  isPromotionZalo: boolean;

  @Column({ name: 'date_start', type: 'datetime', nullable: true })
  dateStart?: Date;

  @Column({ name: 'date_end', type: 'datetime', nullable: true })
  dateEnd?: Date;

  @Column({ name: 'is_otp_moba_zalo', type: 'int', default: 0 })
  isOtpMobaZalo: number;

  @Column({
    name: 'opt_moba_template_id',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  optMobaTemplateId?: string;

  @Column({
    name: 'is_change_status_apt',
    type: 'tinyint',
    width: 1,
    default: () => '0',
  })
  isChangeStatusApt: boolean;
}
