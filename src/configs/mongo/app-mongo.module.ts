import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppMongoService } from './app-mongo.service';
import { EventLog, EventLogSchema } from 'src/entities/Schema';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // MongooseModule.forRoot(
    //   process.env.APP_ENV === 'production'
    //     ? process.env.MONGODB_URI
    //     : `mongodb://` +
    //         `${process.env.MONGODB_USERNAME || ''}` +
    //         `${process.env.MONGODB_PASSWORD ? `:${process.env.MONGODB_PASSWORD}@` : ''}` +
    //         `${process.env.MONGODB_HOST}` +
    //         `:${process.env.MONGODB_PORT}` +
    //         `/${process.env.MONGODB_DATABASE}`,
    // ),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: EventLog.name, schema: EventLogSchema },
    ]),
  ],
  providers: [AppMongoService],
  exports: [AppMongoService],
})
export class AppMongoModule {}
