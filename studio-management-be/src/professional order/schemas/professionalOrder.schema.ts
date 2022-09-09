import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProfessionalOrderDocument = ProfessionalOrder & Document;

@Schema()
export class ProfessionalOrder {
  @Prop({ required: true })
  customer: string;

    @Prop({ required: true})
    contactNumber: string;

    @Prop()
    notes: string;

    @Prop({ required: true})
    orderType: string;

    @Prop({ required: true})
    photoSize: string;

    @Prop({ required: true})
    printPrice: number;

    @Prop({ required: true})
    framePrice: number;

    @Prop({ required: true})
    paymentStatus:string;

  @Prop({ required: true })
  total: number;

    
}

export const ProfessionalOrderSchema = SchemaFactory.createForClass(ProfessionalOrder);