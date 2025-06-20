import { BullModuleOptions } from '@nestjs/bull';

export const bullConfig: BullModuleOptions = {
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
  prefix: 'bull',
};
