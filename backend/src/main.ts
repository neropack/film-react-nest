import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import mongoose from 'mongoose';

async function bootstrap() {
  await mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log('DB connected');
  });
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
