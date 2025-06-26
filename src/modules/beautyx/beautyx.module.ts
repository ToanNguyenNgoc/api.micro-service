import { Module } from '@nestjs/common';
import { BeautyxController } from './beautyx.controller';

@Module({
  controllers: [BeautyxController],
  providers: [],
})
export class BeautyxModule {}
