import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProfessionalCustomer,
  ProfessionalCustomerSchema,
} from './schemas/professionalCustomer.schema';
import { ProfessionalCustomerController } from './professionalCustomer.controller';
import { CustomerService } from './professionalCustomer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProfessionalCustomer.name,
        schema: ProfessionalCustomerSchema,
      },
    ]),
  ],
  controllers: [ProfessionalCustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
