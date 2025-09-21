import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmRepository: FilmsRepository) {}

  async getAllFilms() {
    try {
      const films = await this.filmRepository.findAll();

      return {
        total: films.length,
        items: films,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch films');
    }
  }

  async getFilmSchedule(id: string) {
    try {
      if(!id) throw new BadRequestException('Film ID is required');
      
      const film = await this.filmRepository.findById(id);
      if (!film) throw new NotFoundException('Film not found');

      return {
        total: film.schedule.length,
        items: film.schedule,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException('Invalid film ID');
    }
  }
}
