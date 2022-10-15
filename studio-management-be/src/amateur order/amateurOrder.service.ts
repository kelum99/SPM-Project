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

  async removeAmateurOrder(id: string) {
    try {
      const result = await this.amateurOrderModel.deleteOne({ _id: id });
      if (result && result.deletedCount === 1) {
        return { message: 'Amateur Order deleted!' };
      }
      return { message: 'No Order found!' };
    } catch (e) {
      console.log('delete amateur order error ', e);
      throw new HttpException(
        'Error deleting amateur order',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateAmateurOrderPayment(
    id: string,
    updateOrderDto: AmateurOrderDocument,
  ): Promise<any> {
    try {
      const { payment, orderStatus, total } = updateOrderDto;
      const currentPay = payment
        .map((val) => val.amount)
        .reduce((prev, curr) => prev + curr);
      let payStatus = 'None';

      if (currentPay < total) {
        payStatus = 'Advance';
      } else if (currentPay >= total) {
        payStatus = 'Completed';
      } else {
        payStatus = 'None';
      }
      const result = await this.amateurOrderModel.updateOne(
        { _id: id },
        { paymentStatus: payStatus, payment, orderStatus },
      );
      if (result) {
        return { message: 'Amateur order updated' };
      }
    } catch {
      throw new HttpException(
        'Error Updating Amateur Order',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateAmateurOrder(
    id: string,
    updateOrderDto: AmateurOrderDocument,
  ): Promise<any> {
    try {
      const result = await this.amateurOrderModel.updateOne(
        { _id: id },
        updateOrderDto,
      );
      if (result) {
        return { message: 'Amateur order updated' };
      }
    } catch {
      throw new HttpException(
        'Error Updating Amateur Order',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
