/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { BaseController } from 'src/common/base.controller';
import { LogEvent } from 'src/decorators/LogEvent';
import { OrganizationEntity, UserZaloOtpEntity } from 'src/entities';
import { CIZaloConfigEntity, CIZaloHistoryEntity, CIZaloMoneyEntity } from 'src/entities/CI';
import { SlackHelper, ZaloHelper } from 'src/helpers';
import { TenantDatabaseService } from 'src/modules/tenant-database/tenant-database.service';
import { Util } from 'src/utils';
import { IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class MobaController extends BaseController {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly orgRepo: Repository<OrganizationEntity>,
    @InjectRepository(UserZaloOtpEntity)
    private readonly userZaloOtpRepo: Repository<UserZaloOtpEntity>,
    tenantDb: TenantDatabaseService,
  ) {
    super(tenantDb)
  }
  @LogEvent()
  @EventPattern('moba.zalo.otp')
  async zaloOtpMoba(@Payload() payload: { org_id: any; telephone: string }) {
    const { org_id, telephone } = payload;
    const org = await this.orgRepo.findOne({ where: [{ id: org_id }, { subdomain: org_id }] });
    if (!org) return;
    const zaloConfig = await (await this.getRepo(org.subdomain, CIZaloConfigEntity)).findOne({ where: { id: Not(IsNull()) } });
    if (!zaloConfig) return;
    const zaloMoneyRepo = await this.getRepo(org.subdomain, CIZaloMoneyEntity);
    const zaloHistoryRepo = await this.getRepo(org.subdomain, CIZaloHistoryEntity);

    const zaloMoneyResult = await zaloMoneyRepo
      .createQueryBuilder('df_zalo_money')
      .select([
        'SUM(CASE WHEN df_zalo_money.type = 0 THEN df_zalo_money.money_volatile ELSE 0 END) AS zalo_money_in',
        'SUM(CASE WHEN df_zalo_money.type = 1 THEN df_zalo_money.money_volatile ELSE 0 END) AS zalo_money_out',
      ])
      .getRawOne();
    const zaloMoneySum = zaloMoneyResult.zalo_money_in - zaloMoneyResult.zalo_money_out;

    if (zaloMoneySum < 660) {
      await zaloHistoryRepo.save(zaloHistoryRepo.create({
        type: CIZaloHistoryEntity.ZNS_OTP_MOBA_TYPE,
        type_api: CIZaloHistoryEntity.ZNS_ZALO,
        status: CIZaloHistoryEntity.ZNS_FAIL,
        error: 'Số dư trong tài khoản không đủ',
        phone: telephone,
        money_spent: CIZaloHistoryEntity.MONEY_FAIL,
        order_apt_id: telephone,
        branch_id: 0,
        created_by_id: -1,
        created_date: new Date(),
      }))
    } else {
      const zaloHistory = await zaloHistoryRepo.save(zaloHistoryRepo.create({
        type: CIZaloHistoryEntity.ZNS_OTP_MOBA_TYPE,
        type_api: CIZaloHistoryEntity.ZNS_ZALO,
        status: CIZaloHistoryEntity.ZNS_SUCCESS,
        error: '',
        phone: telephone,
        money_spent: 330,
        order_apt_id: telephone,
        branch_id: 0,
        created_by_id: -1,
        created_date: new Date(),
      }));
      if (zaloHistory.id) {
        const zaloMoney = await zaloMoneyRepo.save(zaloMoneyRepo.create({
          money_volatile: 330,
          money_after: zaloMoneySum - 330,
          zalo_history_id: zaloHistory.id,
          money_before: zaloMoneySum,
          type: CIZaloMoneyEntity.PAY_OUT,
          oa_id: zaloConfig.oaId,
          branch_id: 0,
          created_by_id: -1,
          created_date: new Date(),
        }));
        if (zaloMoney.id) {
          const otp = Util.createOtp();
          const response = await axios.post(`${ZaloHelper.zaloApiUrl}/message/template`, {
            phone: ZaloHelper.formatStringZalo(telephone).telephone,
            template_id: zaloConfig.optMobaTemplateId,
            template_data: { otp },
            tracking_id: new Date().getTime(),
          }, {
            headers: {
              'Content-Type': 'application/json',
              'access_token': zaloConfig.token
            }
          });
          this.userZaloOtpRepo.save(this.userZaloOtpRepo.create({
            telephone,
            code: otp,
            created_at: new Date(),
            updated_at: new Date()
          }))
          SlackHelper.log({ status: 'success', payload: { ...payload, otp_gen: otp }, functionName: 'MobaController.zaloOtpMoba', response: JSON.stringify(response.data) });
        }
      }
    }
    return;
  }
}
