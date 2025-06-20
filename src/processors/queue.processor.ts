// queue.processor.ts
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('nestjs-worker')
export class QueueProcessor {
  @Process()
  async handleJob(job: Job<any>) {
    console.log(job);
    const { type, payload } = job.data;
    console.log(`Received job from Laravel: ${type}`);
    switch (type) {
      case 'send_email':
        console.log(`Gửi email tới: ${payload.to}`);
        break;
      case 'ai_task':
        console.log('Chạy AI processing:', payload);
        break;

      default:
        console.warn('Không rõ job type:', type);
    }
  }
}
