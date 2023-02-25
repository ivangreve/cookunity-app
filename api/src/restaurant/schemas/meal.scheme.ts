import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MealDocument = Meal & Document;

@Schema()
export class Meal {
    _id: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    chef: Types.ObjectId;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    image: string;

    rating: number;
}

export const MealSchema = SchemaFactory.createForClass(Meal);
