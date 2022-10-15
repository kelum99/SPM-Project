
import{
  Payment,
  PaymentType,
  
  
} from './professionalOrder.interface';

export class CreateProfessionalOrderDto {
  readonly customer: string;
  readonly contactNumber: string;
  readonly notes: string;
  readonly paymentStatus: PaymentType;
  readonly orderType: string;
  readonly photoSize: string;
  readonly printPrice: number;
  readonly framePrice: number;
  readonly ceremonyDate: Date;
  readonly orderDate: Date;
  readonly payment: Payment[];
  
  readonly total: number;
  _id?: string;
}