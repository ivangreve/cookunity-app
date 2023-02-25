import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Meal } from '../schemas/meal.scheme';
import { MealRatingService } from '../services/meal-rating.service';
import { MealService } from '../services/meal.service';

@ApiTags('Meals')
@Controller('meals')
export class MealController {
    constructor(private mealService: MealService, private mealRatingService: MealRatingService) { }

    @ApiOperation({ summary: 'Create a meal' })
    @ApiCreatedResponse({ description: 'The meal has been successfully created.', type: Meal })
    @ApiBadRequestResponse({ description: 'Invalid request body or missing required fields. Please check the request and try again.' })
    @Post()
    async create(@Body() meal: Meal): Promise<Meal> {
        const createdMeal = await this.mealService.create(meal);
        return createdMeal;
    }

    @ApiOperation({ summary: 'Get all meals' })
    @ApiOkResponse({ description: 'Retrieved all meals successfully.', type: [Meal] })
    @ApiBadRequestResponse({ description: 'Error retrieving meals. Please try again later.' })
    @Get()
    async findAll(): Promise<Meal[]> {
        const meals = await this.mealService.findAll();
        // const mealsRated = await meals.map(async m => {
        //     const rate = await this.mealRatingService.getAverageRatingByMealId(m._id);
        //     m.rating = rate
        // });
        // console.log(mealsRated)
        return meals;
    }

    @ApiOperation({ summary: 'Get meal by id' })
    @ApiOkResponse({ description: 'Retrieved a meal by id successfully.', type: Meal })
    @ApiBadRequestResponse({ description: 'Error retrieving meal. Please try again later.' })
    @Get(':id')
    async findById(@Param('mealId') mealId: string): Promise<any> {
        const meal = await this.mealService.findById(mealId);
        const rate = await this.mealRatingService.getAverageRatingByMealId(meal._id);
        return {
            _id: meal._id,
            name: meal.name,
            chef: meal.chef,
            desciption: meal.description,
            image: meal.image,
            rating: rate
        };
    }

    @ApiOperation({ summary: 'Update a meal' })
    @ApiOkResponse({ description: 'The meal has been successfully updated.', type: Meal })
    @ApiBadRequestResponse({ description: 'Invalid request body or missing required fields. Please check the request and try again.' })
    @Put(':id')
    async update(@Param('mealId') mealId: string, @Body() meal: Meal): Promise<Meal> {
        const updatedMeal = await this.mealService.update(mealId, meal);
        return updatedMeal;

    }

    @ApiOperation({ summary: 'Delete a meal' })
    @ApiOkResponse({ description: 'The meal has been successfully deleted.' })
    @ApiBadRequestResponse({ description: 'Error deleting meal. Please try again later.' })
    @Delete(':id')
    async delete(@Param('mealId') mealId: string): Promise<void> {
        await this.mealService.delete(mealId);

    }
}




