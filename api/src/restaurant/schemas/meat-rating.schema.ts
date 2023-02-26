import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MealRatingDocument = MealRating & Document;

@Schema()
export class MealRating {
    constructor(user: Types.ObjectId, meal: Types.ObjectId, rating: number) {
        this.user = user;
        this.meal = meal;
        this.rating = rating;
    }

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Meal', required: true })
    meal: Types.ObjectId;

    @Prop({ type: Number, min: 1, max: 5, required: true })
    rating: number;
}

export const MealRatingSchema = SchemaFactory.createForClass(MealRating);
