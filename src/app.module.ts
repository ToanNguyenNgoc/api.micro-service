import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from 'database/data-source';
import { FirebaseAdminService } from './services';
import { MobaModule } from './modules/moba/moba.module';
import { TenantDatabaseModule } from './modules/tenant-database/tenant-database.module';
import { BeautyxModule } from './modules/beautyx/beautyx.module';
import { PushNotifyModule } from './modules/push-notify/push-notify.module';
import { AppScheduleModule } from './schedule/app-schedule.module';
import { AppMongoModule } from './configs';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AppMongoModule,
    TenantDatabaseModule,
    MobaModule,
    BeautyxModule,
    PushNotifyModule,
    AppScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseAdminService],
})
export class AppModule {}
