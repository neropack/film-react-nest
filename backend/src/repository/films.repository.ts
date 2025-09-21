import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/films/entitites/film.entity';
import { Schedule } from 'src/films/entitites/schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmRepository.find();
  }

  async findById(id: string): Promise<Film | null> {
    return this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
  }

  async updateFilm(film: Film): Promise<Film> {
    return this.filmRepository.save(film);
  }
}
