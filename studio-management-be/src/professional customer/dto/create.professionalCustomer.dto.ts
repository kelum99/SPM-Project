export class CreateProfessionalCustomerDto {
  readonly studioName: string;
  readonly ownerName: string;
  readonly address: string;
  readonly mobile: string;
  readonly accountBalance: number;
  readonly joinDate: Date;
  readonly shopName: string;

  readonly total: string;
  readonly date: string;

  readonly orderStatus: string;
  readonly paymentStatus: string;
  _id?: string;
}
