import { Injectable } from '@nestjs/common';
import { FilmModel, Film } from '../films/films.schema';

@Injectable()
export class FilmsRepository {
  async findAll(): Promise<Film[]> {
    return FilmModel.find().lean().exec();
  }

  async findById(id: string): Promise<Film | null> {
    return FilmModel.findOne({ id }).lean().exec();
  }

  async updateFilm(film: Film): Promise<Film> {
    return FilmModel.findOneAndUpdate(
      { id: film.id },
      { schedule: film.schedule },
      { new: true },
    )
      .lean()
      .exec();
  }
}
