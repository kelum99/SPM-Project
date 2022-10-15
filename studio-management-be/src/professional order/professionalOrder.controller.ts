import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProfessionalOrderDto } from './dto/create.professionalOrder.dto';
import { ProfessionalOrderService } from './professionalOrder.service';
import { ProfessionalOrderDocument } from './schemas/professionalOrder.schema';

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

   @Delete('/:id')
  async removeProfessionalOrder(@Param('id') id: string) {
    return this.professionalOrderService.removeProfessionalOrder(id);
 }

 @Patch('professionalOrderPayment/:id')
 async updateProfessionalOrderPayment(
  @Param('id') id: string,
  @Body() updateOrderDto: ProfessionalOrderDocument,
 ){
  return this.professionalOrderService.updateProfessionalOrderPayment(id, updateOrderDto);
 }

 @Patch('/:id')
 async updateProfessionalOrder(
  @Param('id') id: string,
  @Body() updateOrderDto: ProfessionalOrderDocument,
 ){
  return this.professionalOrderService.updateProfessionalOrder(id, updateOrderDto);
 }
}