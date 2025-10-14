import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger extends ConsoleLogger {
  private escapeValue(value: any): string {
    const str = String(value).replace(/\t/g, '\\t').replace(/\n/g, '\\n');
    return str;
  }

  private formatMesssage(
    level: string,
    message: any,
    ...optionalParams: any[]
  ): string {
    const timestamp = new Date().toISOString();
    const escapedMessage = this.escapeValue(message);
    const params = optionalParams
      .map((param) => this.escapeValue(param))
      .join('\t');
    return `timestamp=${timestamp}\tlevel=${level}\tmessage=${escapedMessage}${params ? `\tparams=${params}` : ''}\n`;
  }

  log(message: any, ...optionalParams: any[]) {
    process.stdout.write(
      this.formatMesssage('log', message, ...optionalParams),
    );
  }

  error(message: any, ...optionalParams: any[]) {
    process.stdout.write(
      this.formatMesssage('error', message, ...optionalParams),
    );
  }

  warn(message: any, ...optionalParams: any[]) {
    process.stdout.write(
      this.formatMesssage('warn', message, ...optionalParams),
    );
  }

  debug(message: any, ...optionalParams: any[]) {
    process.stdout.write(
      this.formatMesssage('debug', message, ...optionalParams),
    );
  }

  verbose(message: any, ...optionalParams: any[]) {
    process.stdout.write(
      this.formatMesssage('verbose', message, ...optionalParams),
    );
  }
}
