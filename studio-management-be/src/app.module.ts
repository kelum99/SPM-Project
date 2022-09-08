import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventOrderModule } from './event order/eventOrder.module';
<<<<<<< HEAD
import { ProfessionalOrderModule } from './professional order/professionalOrder.module';

const DB_URL = `mongodb+srv://Kelum:SPM1234@spm.tnya5xw.mongodb.net/?retryWrites=true&w=majority`;
@Module({
  imports: [MongooseModule.forRoot(DB_URL), EventOrderModule, ProfessionalOrderModule],
=======
import { AmateurOrderModule } from './amateur order/amaterOrder.module';

const DB_URL = `mongodb+srv://Kelum:SPM1234@spm.tnya5xw.mongodb.net/?retryWrites=true&w=majority`;
@Module({
  imports: [
    MongooseModule.forRoot(DB_URL),
    EventOrderModule,
    AmateurOrderModule,
  ],
>>>>>>> 17b20c0983a06b6fecb10b3d3f212c0cf293e008
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
