import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProfessionalOrderController } from './professionalOrder.controller';
import { ProfessionalOrderService } from './professionalOrder.service';
import { ProfessionalOrder, ProfessionalOrderSchema} from '/schemas/professionalOrder.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ProfessionalOrder.name, schema: ProfessionalOrderSchema},
        ]),
    ],
    controllers: [ProfessionalOrderController],
    providers: [ProfessionalOrderService]
})
export class ProfessionalOrderModule {}