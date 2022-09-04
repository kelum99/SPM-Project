import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventOrderController } from './eventOrder.controller';
import { EventOrderService } from './eventOrder.service';
import { EventOrder, EventOrderSchema } from './schemas/eventOrder.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventOrder.name, schema: EventOrderSchema },
    ]),
  ],
  controllers: [EventOrderController],
  providers: [EventOrderService],
})
export class EventOrderModule {}
