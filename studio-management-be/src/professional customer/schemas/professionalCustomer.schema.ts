import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProfessionalCustomerDocument = ProfessionalCustomer & Document;

@Schema()
export class ProfessionalCustomer {
  @Prop({ required: true })
  studioName: string;

  @Prop({ required: true })
  ownerName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true })
  accountBalance: number;

  @Prop({ required: true })
  joinDate: Date;
}

export const ProfessionalCustomerSchema = SchemaFactory.createForClass(
  ProfessionalCustomer,
);
