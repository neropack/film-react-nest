//TODO описать DTO для запросов к /films
export class FilmDto {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
}

export class SessionDto {
  id: string;
  film: string;
  daytime: string;
  day: string;
  time: string;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];;
}
