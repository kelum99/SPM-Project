import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProfessionalOrderDto } from "./dto/create.professionalOrder.dto";
import { ProfessionalOrder, ProfessionalOrderDocument } from "./schemas/professionalOrder.schema";

@Injectable()
export class ProfessionalOrderService {
  deleteProfessionalOrder(id: string) {
    throw new Error('Method not implemented.');
  }
    constructor(
        @InjectModel(ProfessionalOrder.name)
        private readonly professionalOrderModel: Model<ProfessionalOrderDocument>,

    ) {}

    async create(createDto: CreateProfessionalOrderDto): Promise<ProfessionalOrder> {
        try {
            const createdItem = new this.professionalOrderModel({
                ...createDto,
                orderDate: Date.now(),
            });
            return createdItem.save();
        }catch {
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

}
