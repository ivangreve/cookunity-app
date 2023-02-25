import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meal, MealDocument } from '../schemas/meal.scheme';

@Injectable()
export class MealService {
    constructor(
        @InjectModel(Meal.name) private mealModel: Model<MealDocument>,
    ) { }

    async create(meal: Meal): Promise<Meal> {
        try {
            const createdMeal = new this.mealModel(meal);
            return createdMeal.save();
        } catch (error) {
            throw new Error(`Error creating meal: ${error.message}`);
        }
    }

    async findAll(): Promise<Meal[]> {
        try {
            return this.mealModel.find().populate({
                path: 'chef',
                select: '_id name email',
            }).exec();
        } catch (error) {
            throw new Error(`Error retrieving meals: ${error.message}`);
        }
    }

    async findById(id: string): Promise<Meal> {
        try {
            const meal = await this.mealModel.findOne({ id }).populate({
                path: 'chef',
                select: '_id name email',
            }).exec();
            if (!meal) {
                throw new Error(`Meal with id ${id} not found`);
            }
            return meal;
        } catch (error) {
            throw new Error(`Error retrieving meal: ${error.message}`);
        }
    }

    async update(id: string, meal: Meal): Promise<Meal> {
        try {
            const updatedMeal = await this.mealModel.findOneAndUpdate({ id }, meal, {
                new: true,
            }).exec();
            if (!updatedMeal) {
                throw new Error(`Meal with id ${id} not found`);
            }
            return updatedMeal;
        } catch (error) {
            throw new Error(`Error updating meal: ${error.message}`);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const result = await this.mealModel.deleteOne({ id }).exec();
            if (result.deletedCount === 0) {
                throw new Error(`Meal with id ${id} not found`);
            }
        } catch (error) {
            throw new Error(`Error deleting meal: ${error.message}`);
        }
    }
}