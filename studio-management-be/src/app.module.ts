import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventOrderModule } from './event order/eventOrder.module';

const DB_URL = `mongodb+srv://Kelum:SPM1234@spm.tnya5xw.mongodb.net/?retryWrites=true&w=majority`;
@Module({
  imports: [MongooseModule.forRoot(DB_URL), EventOrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
