/* eslint-disable prettier/prettier */
import { CIZaloMoneyEntity } from 'src/entities/CI';
import { TenantDatabaseService } from 'src/modules/tenant-database/tenant-database.service';

export class ZaloHelper {
  static zaloApiUrl = 'https://business.openapi.zalo.me';
  
  static async getZaloMoney(subdomain: string) {
    const tenantDbService = new TenantDatabaseService();
    const zaloMoneyRepo = await tenantDbService.onOrgRepo(subdomain,CIZaloMoneyEntity);
    const result = await zaloMoneyRepo
      .createQueryBuilder('df_zalo_money')
      .select([
        'SUM(CASE WHEN df_zalo_money.type = 0 THEN df_zalo_money.money_volatile ELSE 0 END) AS zalo_money_in',
        'SUM(CASE WHEN df_zalo_money.type = 1 THEN df_zalo_money.money_volatile ELSE 0 END) AS zalo_money_out',
      ])
      .getRawOne();
    return {
      zaloMoneySum: result.zalo_money_in - result.zalo_money_out,
      zaloMoneyRepo,
    };
  }

  static formatStringZalo(telephone?: string) {
    const data = {} as any;
    if (telephone) {
      data.telephone = `84${telephone.slice(1, telephone.length)}`;
    }
    return data;
  }
}
