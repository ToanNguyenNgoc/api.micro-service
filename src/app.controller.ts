import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  @EventPattern('user.created')
  handleUserCreated(@Payload() data: any) {
    console.log('Received message from Laravel:', data);
  }
}
