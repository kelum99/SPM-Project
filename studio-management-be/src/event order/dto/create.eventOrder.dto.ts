import { EventItems, OrderType, PaymentType } from './eventOrder.interface';

export class CreateEventOrderDto {
  readonly customer: string;
  readonly mobile: string;
  readonly eventType: string;
  readonly eventDate: Date;
  readonly items: EventItems[];
  readonly total: number;
  readonly orderStatus: OrderType;
  readonly paymentStatus: PaymentType;
  readonly orderDate: Date;
  readonly note?: string;
  _id?: string;
}
