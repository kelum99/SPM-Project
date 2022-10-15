import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import e from 'express';
import { Model } from 'mongoose';
import { CreateProfessionalOrderDto } from './dto/create.professionalOrder.dto';
import {
  ProfessionalOrder,
  ProfessionalOrderDocument,
} from './schemas/professionalOrder.schema';

@Injectable()
export class ProfessionalOrderService {
  constructor(
    @InjectModel(ProfessionalOrder.name)
    private readonly professionalOrderModel: Model<ProfessionalOrderDocument>,
  ) {}

  async create(
    createDto: CreateProfessionalOrderDto,
  ): Promise<ProfessionalOrder> {
    try {
      const { payment, total } = createDto;
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
      const createdItem = new this.professionalOrderModel({
        ...createDto,
        orderDate: Date.now(),
        paymentStatus: payStatus,
      });
      return createdItem.save();
    } catch {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(): Promise<ProfessionalOrder[]> {
    try {
      return this.professionalOrderModel.find().exec();
    } catch {
      throw new HttpException(
        'Error Getting Professional Orders',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getProfessionalOrder(id: string): Promise<ProfessionalOrder> {
    try {
      const order = await this.professionalOrderModel.findById(id);
      return order;
    } catch {
      throw new HttpException(
        'Error Getting Professional Order',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async removeProfessionalOrder(id: string) {
    try {
      const result = await this.professionalOrderModel.deleteOne({ _id: id });
      if (result && result.deletedCount === 1) {
        return { message: 'Order deleted!' };
      }
      return { message: 'No Order found!' };
    } catch (e) {
      console.log('delete prof order error', e);
      throw new HttpException(
        'Error deleting professional order',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateProfessionalOrderPayment(
    id: string,
    updateOrderDto: ProfessionalOrderDocument,
  ): Promise<any> {
    try {
      const { payment, total } = updateOrderDto;
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
      const result = await this.professionalOrderModel.updateOne(
        { _id: id },
        { paymentStatus: payStatus, payment },
      );
      if (result) {
        return { message: 'Professional order updated' };
      }
    } catch {
      throw new HttpException(
        'Error Updating professional Order',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateProfessionalOrder(
    id: string,
    updateOrderDto: ProfessionalOrderDocument,
  ): Promise<any> {
    try {
      const result = await this.professionalOrderModel.updateOne(
        { _id: id },
        updateOrderDto,
      );
      if (result) {
        return { message: 'Professional order updated' };
      }
    } catch {
      throw new HttpException(
        'Error Updating Professional Order',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
