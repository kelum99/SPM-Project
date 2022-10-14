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

  async getAll(): Promise<ProfessionalCustomer[]> {
    try {
      return await this.serviceModel.find().exec();
    } catch {
      throw new HttpException(
        'Error Getting Event Orders',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getProfessionalCustomer(id: string): Promise<ProfessionalCustomer> {
    try {
      const customer = await this.serviceModel.findById(id);
      return customer;
    } catch {
      throw new HttpException(
        'Error Getting Event Order',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async removeProfessionalCustomer(id: string) {
    try {
      const result = await this.serviceModel.deleteOne({ _id: id });
      if (result && result.deletedCount === 1) {
        return { message: 'Customer deleted!' };
      }
      return { message: 'No Customer found!' };
    } catch (e) {
      console.log('delete prof customer error ', e);
      throw new HttpException(
        'Error deleting professional customer',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
