import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAmateurOrderDto } from './dto/create.amateurOrder.dto';
import {
  AmateurOrder,
  AmateurOrderDocument,
} from './schemas/amateurOrder.schema';

@Injectable()
export class AmateurOrderService {
  constructor(
    @InjectModel(AmateurOrder.name)
    private readonly amateurOrderModel: Model<AmateurOrderDocument>,
  ) {}

  async create(createDto: CreateAmateurOrderDto): Promise<AmateurOrder> {
    try {
      const createdItem = new this.amateurOrderModel({
        ...createDto,
        orderDate: Date.now(),
      });
      return createdItem.save();
    } catch {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(): Promise<AmateurOrder[]> {
    try {
      return this.amateurOrderModel.find().exec();
    } catch {
      throw new HttpException(
        'Error Getting Amateur Orders',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAmateurOrder(id: string): Promise<AmateurOrder> {
    try {
      const order = await this.amateurOrderModel.findById(id);
      return order;
    } catch {
      throw new HttpException(
        'Error Getting Amateur Order',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
