import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let mockFilmsService: Partial<FilmsService>;

  beforeEach(async () => {
    mockFilmsService = {
      getAllFilms: jest.fn(),
      getFilmSchedule: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getFilms', () => {
    it('should return all films', async () => {
      const mockFilms = [
        {
          id: 'film1-id',
          title: 'Test Film 1',
          rating: 8.5,
          director: 'Director 1',
          tags: ['action', 'drama'],
          image: 'image1.jpg',
          cover: 'cover1.jpg',
          about: 'About film 1',
          description: 'Description 1',
          schedule: [],
        },
        {
          id: 'film2-id',
          title: 'Test Film 2',
          rating: 7.2,
          director: 'Director 2',
          tags: ['comedy'],
          image: 'image2.jpg',
          cover: 'cover2.jpg',
          about: 'About film 2',
          description: 'Description 2',
          schedule: [],
        },
      ];

      (mockFilmsService.getAllFilms as jest.Mock).mockResolvedValue(mockFilms);

      const result = await controller.getFilms();

      expect(mockFilmsService.getAllFilms).toHaveBeenCalledTimes(1);
      expect(mockFilmsService.getAllFilms).toHaveBeenCalledWith();
      expect(result).toEqual(mockFilms);
    });
  });

  describe('getFilmSchedule', () => {
    it('should return the schedule for a given film ID', async () => {
      const filmId = 'test-film-id';
      const mockSchedule = [
        {
          id: 'schedule1-id',
          daytime: '2023-10-01T14:00:00Z',
          hall: 1,
          rows: 10,
          seats: 100,
          price: 10.5,
          taken: ['A1', 'B2'],
          filmId: filmId,
          film: null, // Предполагается, что отношение не загружено в этом моке
        },
        {
          id: 'schedule2-id',
          daytime: '2023-10-01T17:00:00Z',
          hall: 2,
          rows: 8,
          seats: 80,
          price: 12.0,
          taken: [],
          filmId: filmId,
          film: null,
        },
      ];

      (mockFilmsService.getFilmSchedule as jest.Mock).mockResolvedValue(
        mockSchedule,
      );

      const result = await controller.getFilmSchedule(filmId);

      expect(mockFilmsService.getFilmSchedule).toHaveBeenCalledTimes(1);
      expect(mockFilmsService.getFilmSchedule).toHaveBeenCalledWith(filmId);
      expect(result).toEqual(mockSchedule);
    });

    it('should handle invalid film ID gracefully (service returns empty array)', async () => {
      const invalidFilmId = 'invalid-id';
      const emptySchedule: any[] = [];

      (mockFilmsService.getFilmSchedule as jest.Mock).mockResolvedValue(
        emptySchedule,
      );

      const result = await controller.getFilmSchedule(invalidFilmId);

      expect(mockFilmsService.getFilmSchedule).toHaveBeenCalledTimes(1);
      expect(mockFilmsService.getFilmSchedule).toHaveBeenCalledWith(
        invalidFilmId,
      );
      expect(result).toEqual(emptySchedule);
    });
  });
});
