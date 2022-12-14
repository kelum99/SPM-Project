import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  AmateurItems,
  AmateurPhotos,
  OrderType,
  PaymentType,
  Payment,
} from '../dto/amateurOrder.interface';

export type AmateurOrderDocument = AmateurOrder & Document;

@Schema()
export class AmateurOrder {
  @Prop({ required: true })
  customer: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true, type: Object })
  photos: AmateurPhotos;

  @Prop({ required: true, type: Object })
  items: AmateurItems;

  @Prop({ required: true })
  total: number;

  @Prop({ required: true })
  orderStatus: OrderType;

  @Prop({ required: true })
  paymentStatus: PaymentType;

  @Prop({ required: true })
  orderDate: Date;

  @Prop()
  payment: Payment[];

  @Prop()
  note: string;
}

export const AmateurOrderSchema = SchemaFactory.createForClass(AmateurOrder);
