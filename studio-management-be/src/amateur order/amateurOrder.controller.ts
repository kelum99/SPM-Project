import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreateAmateurOrderDto } from './dto/create.amateurOrder.dto';
import { AmateurOrderService } from './amateurOrder.service';

@Controller('amateurOrders')
export class AmateurOrderController {
  constructor(private amateurOrderService: AmateurOrderService) {}

  @Post('/add')
  @HttpCode(201)
  async add(@Body() createItemDto: CreateAmateurOrderDto) {
    return await this.amateurOrderService.create(createItemDto);
  }

  @Get()
  async getAll() {
    return this.amateurOrderService.getAll();
  }

  @Get('/:id')
  async getAmateurOrder(@Param('id') id: string) {
    return this.amateurOrderService.getAmateurOrder(id);
  }
}
