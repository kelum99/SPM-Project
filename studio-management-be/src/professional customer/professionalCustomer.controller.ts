import {
  Controller,
  Post,
  HttpCode,
  Body,
  Get,
  Delete,
  Patch,
  Param,
} from '@nestjs/common';
import { CreateProfessionalCustomerDto } from './dto/create.professionalCustomer.dto';
import { CustomerService } from './professionalCustomer.service';
import { ProfessionalCustomerDocument } from './schemas/professionalCustomer.schema';

@Controller('professionalCustomer')
export class ProfessionalCustomerController {
  constructor(private service: CustomerService) {}

  @Post('/add')
  @HttpCode(201)
  async create(@Body() createCustomerDto: CreateProfessionalCustomerDto) {
    return await this.service.create(createCustomerDto);
  }

  @Get()
  async getAll() {
    return this.service.getAll();
  }

  @Get('/:id')
  async getProfessionalCustomer(@Param('id') id: string) {
    return this.service.getProfessionalCustomer(id);
  }

  @Delete('/:id')
  async removeProfessionalCustomer(@Param('id') id: string) {
    return this.service.removeProfessionalCustomer(id);
  }

  @Patch('/:id')
  async updateProfessionalCustomer(
    @Param('id') id: string,
    @Body() udpateCustomerDto: ProfessionalCustomerDocument,
  ) {
    return this.service.updateProfessionalCustomer(id, udpateCustomerDto);
  }
}
