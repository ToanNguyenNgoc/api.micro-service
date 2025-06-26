import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeautyXFcmEntity, BeautyxSettingEntity } from 'src/entities';
import { PushNotifyService } from './push-notify.service';
import { FirebaseAdminService } from 'src/services';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([BeautyXFcmEntity, BeautyxSettingEntity])],
  providers: [FirebaseAdminService, PushNotifyService],
  exports: [PushNotifyService],
})
export class PushNotifyModule {}
