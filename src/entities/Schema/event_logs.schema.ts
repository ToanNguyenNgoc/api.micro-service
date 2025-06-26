import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventLogDocument = EventLog & Document;

@Schema({ timestamps: true, collection: 'event_logs' })
export class EventLog {
  @Prop()
  event: string;

  @Prop({ type: Object })
  payload: any;

  @Prop({ default: 'success' })
  status: 'success' | 'failed';

  @Prop()
  error_message?: string;
}

export const EventLogSchema = SchemaFactory.createForClass(EventLog);
