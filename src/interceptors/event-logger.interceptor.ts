import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, tap } from 'rxjs';
import { RmqContext } from '@nestjs/microservices';
import { throwError } from 'rxjs';
import { AppMongoService } from 'src/configs';
import { SlackHelper } from 'src/helpers';

@Injectable()
export class EventLogInterceptor implements NestInterceptor {
  constructor(private readonly mongoService: AppMongoService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const rpcCtx = context.switchToRpc();
    const event =
      rpcCtx.getContext<RmqContext>().getPattern?.() || 'unknown_event';
    const data = rpcCtx.getData();

    return next.handle().pipe(
      tap(async () => {
        this.mongoService.eventLog(event, data);
        SlackHelper.log({
          status: 'success',
          functionName: event,
          payload: data,
          response: '',
        });
      }),
      catchError((err) => {
        this.mongoService.eventLog(
          event,
          data,
          'failed',
          err?.message || 'Unknown error',
        );
        SlackHelper.log({
          status: 'error',
          functionName: event,
          payload: data,
          response: JSON.stringify(err?.message),
        });
        return throwError(() => err);
      }),
    );
  }
}
