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
    })
  }
  
  async updateFilm(film: Film): Promise<Film> {
    return this.filmRepository.save(film);
  }
}

// import { FilmModel, Film } from '../films/films.schema';

// @Injectable()
// export class FilmsRepository {
//   async findAll(): Promise<Film[]> {
//     return FilmModel.find().lean().exec();
//   }

//   async findById(id: string): Promise<Film | null> {
//     return FilmModel.findOne({ id }).lean().exec();
//   }

//   async updateFilm(film: Film): Promise<Film> {
//     return FilmModel.findOneAndUpdate(
//       { id: film.id },
//       { schedule: film.schedule },
//       { new: true },
//     )
//       .lean()
//       .exec();
//   }
// }