//TODO описать DTO для запросов к /films
export class FilmDto {
  id: string;
  title: string;
  description: string;
  poster: string;
}
export class FilmScheduleDto extends FilmDto {
  schedule: SessionDto[];
}
export class SessionDto {
  id: string;
  datetime: string;
}
