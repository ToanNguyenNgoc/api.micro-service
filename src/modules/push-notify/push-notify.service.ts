/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BeautyXFcmEntity, BeautyxSettingEntity } from 'src/entities';
import { FirebaseAdminService } from 'src/services';
import { Repository } from 'typeorm';

@Injectable()
export class PushNotifyService {
  private readonly logger = new Logger(PushNotifyService.name);
  constructor(
    @InjectRepository(BeautyXFcmEntity)
    private readonly btxFcmRepo: Repository<BeautyXFcmEntity>,
    @InjectRepository(BeautyxSettingEntity)
    private readonly btxSettingRepo: Repository<BeautyxSettingEntity>,
    private readonly firebaseAdminService: FirebaseAdminService,
  ) {}
  async pushBtxCampaign(payload: any) {
    const btxSettings = await this.btxSettingRepo.find();
    if (btxSettings.length === 0) return;
    const btxSetting = btxSettings[0];
    const serviceAccount = JSON.parse(btxSetting.value);
    const btxFcmTokens = await this.btxFcmRepo.find({ select: ['fcm_token'] });
    const admin = await this.firebaseAdminService.getFirebaseApp(
      serviceAccount.project_id,
      serviceAccount,
    );
    btxFcmTokens.forEach((item) => {
      admin
        .messaging()
        .send({
          token: item.fcm_token,
          notification: {
            title: payload.title || 'Title',
            body: payload.description || 'Description',
          },
          data: {
            payload_id: String(payload.payload_id || '1'),
            type: String(payload.type || '1'),
          },
        })
        .then((response) => this.logger.log('Send message success: ', response))
        .catch(() => this.logger.warn('Send message success failed !'));
    });
    return;
  }
}
