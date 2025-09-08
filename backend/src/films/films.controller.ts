import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  getFilms() {
    return 'List of all films';
  }

  @Get(':id/schedule')
  getFilmSchedule(@Param('id') id: string) {
    return `Schedule for film with id ${id}`;
  }
}
