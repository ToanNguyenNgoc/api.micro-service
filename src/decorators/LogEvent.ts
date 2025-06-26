import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { EventLogInterceptor } from 'src/interceptors/event-logger.interceptor';

export function LogEvent() {
  return applyDecorators(UseInterceptors(EventLogInterceptor));
}
