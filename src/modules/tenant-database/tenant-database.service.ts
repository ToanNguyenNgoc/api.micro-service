import { BadRequestException, Logger } from '@nestjs/common';
import {
  CIZaloConfigEntity,
  CIZaloHistoryEntity,
  CIZaloMoneyEntity,
} from 'src/entities/CI';
import {
  DataSource,
  DataSourceOptions,
  EntityTarget,
  Repository,
} from 'typeorm';

export class TenantDatabaseService {
  private readonly logger = new Logger(TenantDatabaseService.name);
  private dataSources = new Map<string, DataSource>();

  async getOriginDataSource(dbName: string): Promise<DataSource> {
    if (this.dataSources.has(dbName)) {
      return this.dataSources.get(dbName)!;
    }

    const dataSourceOptions: DataSourceOptions = {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3306'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: dbName,
      entities: [CIZaloConfigEntity, CIZaloHistoryEntity, CIZaloMoneyEntity],
      synchronize: false,
    };

    const dataSource = new DataSource(dataSourceOptions);

    try {
      await dataSource.initialize();
      this.logger.log(`✅ Connected to DB: ${dbName}`);
      this.dataSources.set(dbName, dataSource);
      return dataSource;
    } catch (error) {
      this.logger.error(`❌ Cannot connect to DB [${dbName}]`, error.message);
      throw new BadRequestException(`Cannot connect to database: ${dbName}`);
    }
  }

  async onOrgRepo<T>(
    dbName: string,
    entity: EntityTarget<T>,
  ): Promise<Repository<T>> {
    const dataSource = await this.getOriginDataSource(dbName);
    return dataSource?.getRepository(entity);
  }
}
