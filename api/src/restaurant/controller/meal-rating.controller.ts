import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { MealRating } from '../schemas/meat-rating.schema';
import { MealRatingService } from '../services/meal-rating.service';


@ApiTags('Meal Ratings')
@Controller('meal-ratings')
export class MealRatingController {
    constructor(private readonly mealRatingService: MealRatingService) { }

    @ApiOperation({ summary: 'Create a meal rating' })
    @ApiCreatedResponse({ status: 201, description: 'The created meal rating', type: MealRating })
    @ApiBadRequestResponse({ description: 'A rating for this meal by this user already exists. Invalid rating value. Rating should be between 1 and 5.' })
    @Post()
    async create(@Body() mealRating: MealRating): Promise<MealRating> {
        const createdMealRating = await this.mealRatingService.create(new Types.ObjectId(mealRating.meal), new Types.ObjectId(mealRating.user), mealRating.rating);
        return createdMealRating;
    }

    @ApiOperation({ summary: 'Get average rating of a meal' })
    @ApiResponse({ status: 200, description: 'Average rating of a meal', type: Number })
    @Get('meal/:mealId/average-rating')
    async getAverageRatingByMealId(@Param('mealId') mealId: string): Promise<number> {
        const averageRating = await this.mealRatingService.getAverageRatingByMealId(new Types.ObjectId(mealId));
        return averageRating;
    }

    @ApiOperation({ summary: 'Get all meal ratings' })
    @ApiResponse({ status: 200, description: 'All meal ratings', type: [MealRating] })
    @Get()
    async findAll(): Promise<MealRating[]> {
        const mealRatings = await this.mealRatingService.findAll();
        return mealRatings;
    }

    @ApiOperation({ summary: 'Get meal ratings by meal ID' })
    @ApiResponse({ status: 200, description: 'Meal ratings by meal ID', type: [MealRating] })
    @Get(':mealId')
    async findByMealId(@Param('mealId') mealId: string): Promise<MealRating[]> {
        const mealRatings = await this.mealRatingService.findByMealId(new Types.ObjectId(mealId));
        return mealRatings;
    }

    @ApiOperation({ summary: 'Get meal ratings by user ID' })
    @ApiResponse({ status: 200, description: 'Meal ratings by user ID', type: [MealRating] })
    @Get('/user/:userId')
    async findByUserId(@Param('userId') userId: string): Promise<MealRating[]> {
        const mealRatings = await this.mealRatingService.findByUserId(new Types.ObjectId(userId));
        return mealRatings;
    }

    @ApiOperation({ summary: 'Delete a meal rating' })
    @ApiResponse({ status: 200, description: 'The deleted meal rating', type: MealRating })
    @Delete(':id')
    async delete(@Param('id') mealRatingId: string): Promise<MealRating> {
        const deletedMealRating = await this.mealRatingService.delete(new Types.ObjectId(mealRatingId));
        return deletedMealRating;
    }
}