/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { LogEvent } from 'src/decorators/LogEvent';
import { SlackHelper } from 'src/helpers';
import { PushNotifyService } from 'src/modules/push-notify/push-notify.service';

@Controller()
export class BeautyxController {
  constructor(private readonly pushNotifyService: PushNotifyService) { }
  
  // @LogEvent()
  @EventPattern('beautyx.notification.campaign')
  async handleBeautyxNotificationCampaign(@Payload() data: any) {
    try {
      await this.pushNotifyService.pushBtxCampaign(data);
      SlackHelper.log({ status: 'success', payload: data, functionName: 'BeautyxController.handleBeautyxNotificationCampaign', response: '' });
    } catch (error) {
      SlackHelper.log({ status: 'error', payload: data, functionName: 'BeautyxController.handleBeautyxNotificationCampaign', response: JSON.stringify(error) });
    }
    return;
  }
}
