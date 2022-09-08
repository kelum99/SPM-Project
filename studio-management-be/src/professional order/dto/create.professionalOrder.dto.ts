export class CreateProfessionalOrderDto {
  readonly customer: string;
  readonly contactNumber: string;
  readonly notes: string;
  readonly paymentStatus: string;
  readonly orderType: string;
  readonly photoSize: string;
  readonly printPrice: number;
  readonly framePrice: number;
  readonly total: number;
  _id?: string;
}