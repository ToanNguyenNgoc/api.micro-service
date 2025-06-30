import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        // urls:['amqp://guest:guest@localhost:5672'],
        urls: [process.env.RABBITMQ_URL],
        queue: 'nestjs_queue',
        queueOptions: { durable: true },
        exchange: 'nestjs_exchange',
      },
    },
  );
  await app.listen();
}
bootstrap();
