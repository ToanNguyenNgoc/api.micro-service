import { Injectable } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  @EventPattern('user.created')
  handleUserCreated(@Payload() data: any) {
    console.log('Received message from Laravel:', data);
  }
}
