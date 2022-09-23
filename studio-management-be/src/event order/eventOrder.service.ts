import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventOrderDto } from './dto/create.eventOrder.dto';
import { EventOrder, EventOrderDocument } from './schemas/eventOrder.schema';

@Injectable()
export class EventOrderService {
  constructor(
    @InjectModel(EventOrder.name)
    private readonly eventOrderModel: Model<EventOrderDocument>,
  ) {}

  async create(createDto: CreateEventOrderDto): Promise<EventOrder> {
    try {
      const createdItem = new this.eventOrderModel({
        ...createDto,
        orderDate: Date.now(),
      });
      return createdItem.save();
    } catch {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(): Promise<EventOrder[]> {
    try {
      return await this.eventOrderModel.find().exec();
    } catch {
      throw new HttpException(
        'Error Getting Event Orders',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getEventOrder(id: string): Promise<EventOrder> {
    try {
      const order = await this.eventOrderModel.findById(id);
      return order;
    } catch {
      throw new HttpException(
        'Error Getting Event Order',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async removeEventOrder(id: string) {
    try {
      const result = await this.eventOrderModel.deleteOne({ _id: id });
      if (result && result.deletedCount === 1) {
        return { message: 'Order deleted!' };
      }
      return { message: 'No Order found!' };
    } catch (e) {
      console.log('delete prof order error ', e);
      throw new HttpException(
        'Error deleting professional order',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
