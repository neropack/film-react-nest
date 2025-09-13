import { Injectable } from '@nestjs/common';
import { FilmsRepository } from 'src/repository/films.repository';

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
}
