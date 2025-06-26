import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventLog, EventLogDocument } from 'src/entities/Schema';

@Injectable()
export class AppMongoService {
  constructor(
    @InjectModel(EventLog.name)
    private readonly eventLogModel: Model<EventLogDocument>,
  ) {}
  eventLog(
    event: string,
    payload: any,
    status = 'success',
    error_message?: string,
  ) {
    return this.eventLogModel.create({
      event,
      payload: JSON.stringify(payload),
      status,
      error_message,
    });
  }
}
