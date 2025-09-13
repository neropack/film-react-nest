import { Injectable } from '@nestjs/common';
import { FilmModel, Film } from '../films/films.schema';

@Injectable()
export class FilmsRepository {
  async findAll(): Promise<Film[]> {
    return FilmModel.find().lean().exec();
  }

  async findById(id: string): Promise<Film | null> {
    return FilmModel.findById(id).exec();
  }

  async updateFilm(film: Film): Promise<Film> {
    return FilmModel.findByIdAndUpdate(film._id, film, { new: true }).exec();
  }
}
