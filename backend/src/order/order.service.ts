import { BadRequestException, Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { Order } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(order: Order) {
    if (order.tickets.length === 0)
      throw new BadRequestException('No tickest in order');

    const filmId = order.tickets[0].film;
    const sessionId = order.tickets[0].session;

    const film = await this.filmsRepository.findById(filmId);
    if (!film)
      throw new BadRequestException(`Film with id ${filmId} not found`);

    const sessionIndex = film.schedule.findIndex(
      (session) => session.id === sessionId,
    );
    if (sessionIndex === -1)
      throw new BadRequestException(`Sessions with id ${sessionId} not found`);
    const session = film.schedule[sessionIndex];

    const takenSeats = new Set(session.taken || []);
    for (const ticket of order.tickets) {
      const seatId = `${ticket.row}-${ticket.seat}`;
      if (takenSeats.has(seatId))
        throw new BadRequestException(`Seat ${seatId} is aleady taken`);
    }

    const newTakenSeats = order.tickets.map(
      (ticket) => `${ticket.row}:${ticket.seat}`,
    );
    const updateTaken = [...takenSeats, ...newTakenSeats];

    film.schedule[sessionIndex].taken = updateTaken;
    await this.filmsRepository.updateFilm(film);

    const result = order.tickets.map((ticket) => ({
      ...ticket,
      id: session.id,
    }));

    return {
      total: result.length,
      items: result,
    };
  }
}
