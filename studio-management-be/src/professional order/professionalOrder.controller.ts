import {Body, Controller, Get, HttpCode, Param, Post} from '@nestjs/common';
import { CreateProfessionalOrderDto } from './dto/create.professionalOrder.dto';
import { ProfessionalOrderService } from './professionalOrder.service';

@Controller('professionalOrders')
export class ProfessionalOrderController {
    constructor(private professionalOrderService: ProfessionalOrderService) {}

    @Post('/add')
    @HttpCode(201)
    async add(@Body() createItemDto: CreateProfessionalOrderDto){
        return await this.professionalOrderService.create(createItemDto);
    }

    @Get()
    async getAll() {
        return this.professionalOrderService.getAll();
    }

    @Get('/:id')
  async getProfessionalOrder(@Param('id') id: string) {
    return this.professionalOrderService.getProfessionalOrder(id);
  }
}