import { TenantDatabaseService } from 'src/modules/tenant-database/tenant-database.service';
import { EntityTarget, Repository } from 'typeorm';

export class BaseController {
  constructor(private readonly tenantDbService: TenantDatabaseService) {}

  async getRepo<T>(
    dbName: string,
    entity: EntityTarget<T>,
  ): Promise<Repository<T>> {
    const dataSource = await this.tenantDbService.getOriginDataSource(dbName);
    return dataSource?.getRepository(entity);
  }
}
