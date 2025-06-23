import { Injectable } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  @EventPattern('user.register')
  async handleUserRegister(@Payload() data: any) {
    console.log('Received message from Laravel:', data);
  }
}
