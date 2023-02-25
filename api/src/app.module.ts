import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from 'src/auth/controllers/auth.controller';
import { AuthService } from 'src/auth/services/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    /* Necesary for use env variables */
    ConfigModule.forRoot(),
    RestaurantModule,
    // MongooseModule.forRoot('mongodb://root:rootpassword@127.0.0.1:27017/initial_bd?authSource=admin'),

    // With docker engine
    // MongooseModule.forRoot('mongodb://root:rootpassword@mongodb_service:27017/initial_bd?authSource=admin'),

    // On Cloud
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    AuthModule
  ],
  controllers: [AppController, AuthController],
  providers: [AuthService],
})
export class AppModule { }
