import {
  EventItems,
  OrderType,
  PaymentType,
  Payment,
} from './eventOrder.interface';

export class CreateEventOrderDto {
  readonly customer: string;
  readonly mobile: string;
  readonly eventType: string;
  readonly address: string;
  readonly eventDate: Date;
  readonly items: EventItems[];
  readonly payment: Payment[];
  readonly total: number;
  readonly orderStatus: OrderType;
  readonly paymentStatus: PaymentType;
  readonly orderDate: Date;
  readonly note?: string;
  _id?: string;
}
