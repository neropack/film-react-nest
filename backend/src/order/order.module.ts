import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { FilmsRepository } from 'src/repository/films.repository';

@Module({
  controllers: [OrderController],
  providers: [OrderService, FilmsRepository],
  exports: [OrderService],
})
export class OrderModule {}
