//TODO реализовать DTO для /orders
export class SeatDto {
  row: number;
  seat: number;
}
export class CreateOrderDto {
  filmId: string;
  sessionId: string;
  seats: SeatDto[];
}
