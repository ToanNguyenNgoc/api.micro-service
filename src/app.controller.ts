import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import axios from 'axios';

@Controller()
export class AppController {
  @EventPattern('user.register')
  async handleUserRegister(@Payload() data: any) {
    console.log('Received message from Laravel:', data);
    const response = await axios.get(
      'https://api.myspa.vn/v1/orders?append=qr_link&filter%5Bplatform%5D=BEAUTYX%7CBEAUTYX%20MOBILE%7CZALO%7CMOMO%7CVIETTEL&filter%5Bproductable%5D=true&filter%5Bstatus%5D=PAID&filter%5BwithServicesSold%5D=true&include=items%7Corganization%7Cappointments%7CbtxReward&limit=15&sort=-created_at',
      {
        headers: {
          Authorization: String(process.env.FE_TOKEN),
        },
      },
    );
    console.log(response.data.context);
    return;
  }
}
