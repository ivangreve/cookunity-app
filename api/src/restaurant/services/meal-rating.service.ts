import { Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MealRating, MealRatingDocument } from '../schemas/meat-rating.schema';

@Injectable()
export class MealRatingService {
    constructor(
        @InjectModel(MealRating.name)
        private readonly mealRatingModel: Model<MealRatingDocument>,
    ) { }

    async create(mealId: Types.ObjectId, userId: Types.ObjectId, rating: number): Promise<MealRating> {
        // Check if rating is between 1 and 5
        if (rating < 1 || rating > 5) {
            throw new Error('Invalid rating value. Rating should be between 1 and 5.');
        }

        // Check if user has already rated this meal
        const existingRating = await this.mealRatingModel.findOne({
            meal: mealId,
            user: userId,
        });
        if (existingRating) {
            throw new Error('A rating for this meal by this user already exists.');
        }

        // Create and save the new rating
        const mealRating = new this.mealRatingModel({
            meal: mealId,
            user: userId,
            rating,
        });
        if (!mealRating.validateSync()) {
            return mealRating.save();
        } else {
            throw new Error('Error saving rating.');
        }
    }

    async getAverageRatingPerMeal(): Promise<{ mealId: Types.ObjectId; rating: number }[]> {
        const ratings = await this.mealRatingModel.aggregate([
            { $group: { _id: '$meal', rating: { $avg: '$rating' }, count: { $sum: 1 } } },
            { $project: { _id: 0, mealId: '$_id', rating: 1, count: 1 } },
        ]);

        return ratings.map((rating) => ({ mealId: rating.mealId, rating: rating.rating, count: rating.count }));
    }

    async getAverageRatingByMealId(mealId: Types.ObjectId): Promise<number> {
        const ratings = await this.mealRatingModel.find({ meal: mealId });
        if (ratings.length === 0) {
            return 0;
        }
        const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
        const averageRating = totalRating / ratings.length;
        return averageRating;
    }

    async findAll(): Promise<MealRating[]> {
        return this.mealRatingModel.find().exec();
    }

    async findByUserId(userId: string): Promise<MealRating[]> {
        return this.mealRatingModel.find({ user: userId }).exec();
    }

    async delete(mealRatingId: string): Promise<MealRating> {
        return this.mealRatingModel.findByIdAndDelete(mealRatingId).exec();
    }
}



