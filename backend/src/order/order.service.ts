import { BadRequestException, ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { Order, TicketResult } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) { }

  async createOrder(order: Order) {
    try {
      if (!order.email) throw new BadRequestException('Email is required');
      if (!order.phone) throw new BadRequestException('Phone number is required');
      if (order.tickets.length === 0)
        throw new BadRequestException('No tickets in order');

      const filmId = order.tickets[0].film;
      const sessionId = order.tickets[0].session;

      const film = await this.filmsRepository.findById(filmId);
      if (!film) throw new NotFoundException(`Film with id ${filmId} not found`);

      const sessionIndex = film.schedule.findIndex(
        (session) => session.id === sessionId,
      );
      if (sessionIndex === -1)
        throw new NotFoundException(`Sessions with id ${sessionId} not found`);
      const session = film.schedule[sessionIndex];

      const seenSeats = new Set<string>();
      for (const ticket of order.tickets) {
        if (ticket.row > session.rows || ticket.seat > session.seats) {
          throw new UnprocessableEntityException(
            `Invalid seat for session ${sessionId}: row <= ${session.rows}, seat <= ${session.seats}`
          );
        }

        const seatKey = `${ticket.row}-${ticket.seat}`;
        if (seenSeats.has(seatKey)) {
          throw new UnprocessableEntityException(`Duplicate seat ${seatKey} in order`);
        }
        seenSeats.add(seatKey);
      }

      const takenSeats = new Set(session.taken || []);
      for (const ticket of order.tickets) {
        const seatId = `${ticket.row}-${ticket.seat}`;
        if (takenSeats.has(seatId))
          throw new ConflictException(`Seat ${seatId} is already taken`);
      }

      const newTakenSeats = order.tickets.map(
        (ticket) => `${ticket.row}:${ticket.seat}`,
      );
      const updateTaken = [...takenSeats, ...newTakenSeats];

      film.schedule[sessionIndex].taken = updateTaken;
      await this.filmsRepository.updateFilm(film);

      const orderId = Date.now().toString();

      const result: TicketResult[] = order.tickets.map((ticket) => ({
        ...ticket,
        id: orderId,
      }));

      return {
        total: result.length,
        items: result,
      };
    } catch (error) {
      if (error instanceof NotFoundException ||
        error instanceof BadRequestException ||
        error instanceof UnprocessableEntityException ||
        error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException('Failed to create order');
    }
  }
}
