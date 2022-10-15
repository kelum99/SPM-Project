import {
  AmateurItems,
  AmateurPhotos,
  OrderType,
  PaymentType,
  Payment,
} from './amateurOrder.interface';

export class CreateAmateurOrderDto {
  readonly customer: string;
  readonly address: string;
  readonly mobile: string;
  readonly photos: AmateurPhotos;
  readonly items: AmateurItems;
  readonly payment: Payment[];
  readonly total: number;
  readonly orderStatus: OrderType;
  readonly paymentStatus: PaymentType;
  readonly orderDate: Date;
  readonly note?: string;
  _id?: string;
}
