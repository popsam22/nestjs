import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  // write function to accept entry and write log to file
  log(message: any, context?: string) {
    //log entry into a text file (excel or any sort)
    const entry = `${context}\t${message}`;
    super.log(message, context);
  }

  error(message: any, stackOrContext?: string) {
    const entry = `${message}\t${stackOrContext}`;
    super.error(message, stackOrContext);
  }
}
