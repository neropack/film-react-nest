import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class DevLogger extends ConsoleLogger {
  log(message: any, ...optionalParams: any[]) {
    super.log(message, ...optionalParams);
  }
}
