import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { CreateEventOrderDto } from './dto/create.eventOrder.dto';
import { EventOrderService } from './eventOrder.service';

@Controller('eventOrders')
export class EventOrderController {
  constructor(private eventOrderService: EventOrderService) {}

  @Post('/add')
  @HttpCode(201)
  async add(@Body() createItemDto: CreateEventOrderDto) {
    return await this.eventOrderService.create(createItemDto);
  }

  @Get()
  async getAll() {
    return this.eventOrderService.getAll();
  }

  @Get('/:id')
  async getEventOrder(@Param('id') id: string) {
    return this.eventOrderService.getEventOrder(id);
  }

  @Delete('/:id')
  async removeEventOrder(@Param('id') id: string) {
    return this.eventOrderService.removeEventOrder(id);
  }
}
