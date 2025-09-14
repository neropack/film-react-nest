import { Post, Body, Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: Order) {
    return this.orderService.createOrder(createOrderDto);
  }
}
