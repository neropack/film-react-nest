import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsRepository } from 'src/repository/films.repository';

@Module({
  controllers: [FilmsController],
  providers: [FilmsService, FilmsRepository],
  exports: [FilmsService],
})
export class FilmsModule {}
