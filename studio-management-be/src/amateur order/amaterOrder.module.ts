import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AmateurOrderController } from './amateurOrder.controller';
import { AmateurOrderService } from './amateurOrder.service';
import {
  AmateurOrder,
  AmateurOrderSchema,
} from './schemas/amateurOrder.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AmateurOrder.name, schema: AmateurOrderSchema },
    ]),
  ],
  controllers: [AmateurOrderController],
  providers: [AmateurOrderService],
})
export class AmateurOrderModule {}
