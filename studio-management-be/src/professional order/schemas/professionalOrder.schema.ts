import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

export type ProfessionalOrderDocument = ProfessionalOrder & Document;

@Schema()
export class ProfessionalOrder {
  @Prop({ required: true })
  customer: string;

    @Prop({ required: true})
    contactNumber: string;

    @Prop({ required: true})
    notes: string;

    @Prop({ required: true})
    orderType: string;

    @Prop({ required: true})
    photoSize: string;

    @Prop({ required: true})
    framePrice: number;

    @Prop({ required: true})
    laminatePrice: number;

  @Prop({ required: true })
  total: number;

    
}

export const ProfessionalOrder = SchemaFactory.createForClass(ProfessionalOrder);