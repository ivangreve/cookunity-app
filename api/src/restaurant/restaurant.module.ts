import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { MealRatingController } from './controller/meal-rating.controller';
import { MealController } from './controller/meal.controller';
import { Meal, MealSchema } from './schemas/meal.scheme';
import { MealRating, MealRatingSchema } from './schemas/meat-rating.schema';
import { MealRatingService } from './services/meal-rating.service';
import { MealService } from './services/meal.service';


console.log(process.env.MONGO_CONNECTION)
@Module({
    imports: [
        /* Necesary for env variables */
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_CONNECTION),
        MongooseModule.forFeature([
            { name: Meal.name, schema: MealSchema },
            { name: MealRating.name, schema: MealRatingSchema }
        ]),
    ],
    controllers: [MealController, MealRatingController],
    providers: [MealService, MealRatingService]
})
export class RestaurantModule { }
