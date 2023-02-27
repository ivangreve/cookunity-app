import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../src/auth/schema/user.schema';
import { AuthService } from '../../src/auth/services/auth.service';
import { UserService } from '../../src/auth/services/user.service';
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
            { name: MealRating.name, schema: MealRatingSchema },
            { name: 'User', schema: UserSchema }
        ]),

    ],
    controllers: [MealController],
    providers: [MealService, MealRatingService, AuthService, UserService]
})
export class RestaurantModule { }
