import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { CreateProfessionalCustomerDto } from './dto/create.professionalCustomer.dto';
import { CustomerService } from './professionalCustomer.service';

@Controller('professionalCustomer')
export class ProfessionalCustomerController {
  constructor(private service: CustomerService) {}

  @Post('/add')
  @HttpCode(201)
  async create(@Body() createCustomerDto: CreateProfessionalCustomerDto) {
    return await this.service.create(createCustomerDto);
  }
}
