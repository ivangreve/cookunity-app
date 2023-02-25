import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MealController } from './controller/meal.controller';
import { Meal, MealSchema } from './schemas/meal.scheme';
import { MealService } from './services/meal.service';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://root:rootpassword@127.0.0.1:27017/initial_bd?authSource=admin'),
        MongooseModule.forFeature([
            { name: Meal.name, schema: MealSchema }
        ]),
    ],
    controllers: [MealController],
    providers: [MealService]
})
export class RestaurantModule { }
