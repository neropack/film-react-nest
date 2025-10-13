import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix('api/afisha');
  app.enableCors();

  const loggerType = process.env.LOGGER_TYPE || (process.env.NODE_ENV === 'development' ? 'dev' : 'tskv');
  let logger;
  switch (loggerType) {
    case 'dev':
      logger = new DevLogger();
      break;
    case 'json':
      logger = new JsonLogger();
      break;
    case 'tskv':
      logger = new TskvLogger();
      break;
    default:
      logger = new DevLogger();
  }
  app.useLogger(logger);
  
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
