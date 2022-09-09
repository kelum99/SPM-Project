import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ProfessionalCustomer,
  ProfessionalCustomerDocument,
} from './schemas/professionalCustomer.schema';
import { Model } from 'mongoose';
import { CreateProfessionalCustomerDto } from './dto/create.professionalCustomer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(ProfessionalCustomer.name)
    private readonly serviceModel: Model<ProfessionalCustomerDocument>,
  ) {}

  async create(
    createCustomerDto: CreateProfessionalCustomerDto,
  ): Promise<ProfessionalCustomer> {
    try {
      const createdCustomer = new this.serviceModel(createCustomerDto);
      return createdCustomer.save();
    } catch {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }
}
