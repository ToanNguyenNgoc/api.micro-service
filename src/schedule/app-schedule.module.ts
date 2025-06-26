import { Module } from '@nestjs/common';
import { AppScheduleService } from './app-schedule.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [AppScheduleService],
})
export class AppScheduleModule {}
