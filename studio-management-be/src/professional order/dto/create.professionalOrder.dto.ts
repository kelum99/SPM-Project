export class CreateProfessionalOrderDto {
  readonly customer: string;
  readonly contactNumber: string;
  readonly notes: string;
  readonly orderType: string;
  readonly photoSize: string;
  readonly framePrice: number;
  readonly laminatePrice: number;
  readonly total: number;
  _id?: string;
}