import { Post, Body, Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResult } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() createOrderDto: OrderResult) {
    return `Order ${createOrderDto.id} created`;
  }
}
