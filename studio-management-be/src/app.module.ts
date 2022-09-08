import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventOrderModule } from './event order/eventOrder.module';
import { ProfessionalOrderModule } from './professional order/professionalOrder.module';
import { AmateurOrderModule } from './amateur order/amaterOrder.module';

const DB_URL = `mongodb+srv://Kelum:SPM1234@spm.tnya5xw.mongodb.net/?retryWrites=true&w=majority`;
@Module({
  imports: [
    MongooseModule.forRoot(DB_URL),
    EventOrderModule,
    AmateurOrderModule,
    ProfessionalOrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
