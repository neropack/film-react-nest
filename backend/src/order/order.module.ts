import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { FilmsRepository } from 'src/repository/films.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from 'src/films/entitites/film.entity';
import { Schedule } from 'src/films/entitites/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [OrderController],
  providers: [OrderService, FilmsRepository],
  exports: [OrderService],
})
export class OrderModule {}
