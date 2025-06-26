import { Module } from '@nestjs/common';
import { MobaController } from './moba.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity, UserZaloOtpEntity } from 'src/entities';
// import { TenantDatabaseService } from 'src/services';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationEntity, UserZaloOtpEntity])],
  controllers: [MobaController],
  providers: [],
})
export class MobaModule {}
