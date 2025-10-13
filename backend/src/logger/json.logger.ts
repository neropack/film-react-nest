import { ConsoleLogger, Injectable } from "@nestjs/common";

@Injectable()
export class JsonLogger extends ConsoleLogger {
    formatMesssage(level: string, message: any, ...optionalParams: any[]) {
        const timestamp = new Date().toISOString();
        return JSON.stringify({
            timestamp,
            level,
            message: typeof message === 'string' ? message : JSON.stringify(message),
            optionalParams: optionalParams.map(param => typeof param === 'string' ? JSON.stringify(param) : param),
        });
    }

    log(message: any, ...optionalParams: any[]) {
        console.log(this.formatMesssage('log', message, ...optionalParams));
    }

    error(message: any, ...optionalParams: any[]) {
        console.log(this.formatMesssage('error', message, ...optionalParams));
    }

    warn(message: any, ...optionalParams: any[]) {
        console.log(this.formatMesssage('warn', message, ...optionalParams));
    }

    debug(message: any, ...optionalParams: any[]) {
        console.log(this.formatMesssage('debug', message, ...optionalParams));
    }

    verbose(message: any, ...optionalParams: any[]) {
        console.log(this.formatMesssage('verbose', message, ...optionalParams));
    }
}