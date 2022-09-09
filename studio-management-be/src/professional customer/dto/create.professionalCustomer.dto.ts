export class CreateProfessionalCustomerDto {
  readonly studioName: string;
  readonly ownerName: string;
  readonly address: string;
  readonly mobile: string;
  readonly accountBalance: number;
  readonly joinDate: Date;
  _id?: string;
}
