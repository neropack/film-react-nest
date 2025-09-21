import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmRepository: FilmsRepository) {}

  async getAllFilms() {
    const films = await this.filmRepository.findAll();
    return {
      total: films.length,
      items: films,
    };
  }

  async getFilmSchedule(id: string) {
    const film = await this.filmRepository.findById(id);
    if (!film) throw new NotFoundException('Film not found');
    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }
}
