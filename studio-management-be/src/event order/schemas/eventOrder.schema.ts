import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  EventItems,
  OrderType,
  Payment,
  PaymentType,
} from '../dto/eventOrder.interface';

export type EventOrderDocument = EventOrder & Document;

@Schema()
export class EventOrder {
  @Prop({ required: true })
  customer: string;

  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  eventType: string;

  @Prop({ required: true })
  eventDate: Date;

  @Prop({ required: true })
  items: EventItems[];

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

export const EventOrderSchema = SchemaFactory.createForClass(EventOrder);
