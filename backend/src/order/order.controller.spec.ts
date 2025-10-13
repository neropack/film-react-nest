import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let mockOrderService: Partial<OrderService>;

  beforeEach(async () => {
    mockOrderService = {
      createOrder: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('should create an order and return the result from service', async () => {
      const createOrderDto: Order = {
        email: 'test@example.com',
        phone: '+1234567890',
        tickets: [
          {
            film: 'Test Film',
            session: 'Session 1',
            daytime: '2023-10-01T14:00:00Z',
            day: '2023-10-01',
            time: '14:00',
            row: 5,
            seat: 10,
            price: 10.5,
          },
          {
            film: 'Test Film',
            session: 'Session 2',
            daytime: '2023-10-01T17:00:00Z',
            day: '2023-10-01',
            time: '17:00',
            row: 3,
            seat: 8,
            price: 12.0,
          },
        ],
      };

      const mockOrderResult = {
        id: 'order-id-123',
        email: createOrderDto.email,
        phone: createOrderDto.phone,
        tickets: createOrderDto.tickets.map((ticket, index) => ({
          ...ticket,
          id: `ticket-id-${index}`,
        })),
        totalPrice: 22.5,
        createdAt: new Date().toISOString(),
      };

      (mockOrderService.createOrder as jest.Mock).mockResolvedValue(mockOrderResult);

      const result = await controller.createOrder(createOrderDto);

      expect(mockOrderService.createOrder).toHaveBeenCalledTimes(1);
      expect(mockOrderService.createOrder).toHaveBeenCalledWith(createOrderDto);
      expect(result).toEqual(mockOrderResult);
    });

    it('should handle multiple tickets correctly', async () => {
      const createOrderDto: Order = {
        email: 'user@example.com',
        phone: '+0987654321',
        tickets: [
          {
            film: 'Action Movie',
            session: 'Morning Session',
            daytime: '2023-10-02T10:00:00Z',
            day: '2023-10-02',
            time: '10:00',
            row: 1,
            seat: 1,
            price: 8.0,
          },
        ],
      };

      const mockOrderResult = {
        id: 'single-order-id',
        email: createOrderDto.email,
        phone: createOrderDto.phone,
        tickets: [
          {
            ...createOrderDto.tickets[0],
            id: 'single-ticket-id',
          },
        ],
        totalPrice: 8.0,
        createdAt: new Date().toISOString(),
      };

      (mockOrderService.createOrder as jest.Mock).mockResolvedValue(mockOrderResult);

      const result = await controller.createOrder(createOrderDto);

      expect(mockOrderService.createOrder).toHaveBeenCalledTimes(1);
      expect(mockOrderService.createOrder).toHaveBeenCalledWith(createOrderDto);
      expect(result).toEqual(mockOrderResult);
    });
  });
});
