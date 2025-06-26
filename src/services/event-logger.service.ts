import { Injectable } from '@nestjs/common';

@Injectable()
export class EventLoggerService {
  constructor() {}

  async log(
    event: string,
    payload: any,
    status: 'success' | 'failed',
    errorMessage?: string,
  ) {
    console.log({
      event,
      payload,
      status,
      error_message: errorMessage,
    });
    return;
  }
}
