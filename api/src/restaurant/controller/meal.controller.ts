import { Body, Controller, Delete, Get, Param, Query, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiBody, ApiOkResponse, ApiOperation, ApiTags, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Meal } from '../schemas/meal.scheme';
import { MealRating } from '../schemas/meat-rating.schema';
import { MealRatingService } from '../services/meal-rating.service';
import { MealService } from '../services/meal.service';

@ApiTags('Meals')
@Controller('meals')
@ApiBearerAuth('access-token')
export class MealController {
    constructor(private mealService: MealService, private mealRatingService: MealRatingService) { }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a meal' })
    @ApiCreatedResponse({
        description: 'The meal has been successfully created.',
        type: Meal
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                chef: { type: 'string' },
                description: { type: 'string' },
                image: { type: 'string' },
            },
            required: ['name', 'chef'],
            example: {
                name: 'Spaghetti Carbonara',
                chef: 'Gordon Ramsay',
                description: 'A classic Italian pasta dish made with eggs, Parmesan cheese, bacon, and black pepper.',
                image: 'https://url.example.jpg',
            },
        }
    })
    @ApiBadRequestResponse({ description: 'Invalid request body or missing required fields. Please check the request and try again.' })
    @Post()
    async create(@Body() meal: Meal): Promise<Meal> {
        const createdMeal = await this.mealService.create(meal);
        return createdMeal;
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get all meals' })
    @ApiOkResponse({ description: 'Retrieved all meals successfully.', type: [Meal] })
    @ApiBadRequestResponse({ description: 'Error retrieving meals. Please try again later.' })
    @ApiQuery({ name: 'chefId', required: false, description: 'Chef ID to filter meals by.' })
    @Get()
    async findAll(@Query('chefId') chefId?: string): Promise<any[]> {
        const meals = await this.mealService.findAll(chefId);
        const ratePerMeal = await this.mealRatingService.getAverageRatingPerMeal();

        const ratePerMealMap = new Map<string, number>();
        for (const { mealId, rating } of ratePerMeal) {
            ratePerMealMap.set(mealId.toString(), rating);
        }

        const mealsWithRate = meals.map(m => ({
            _id: m._id,
            name: m.name,
            chef: m.chef,
            description: m.description,
            image: m.image,
            rating: ratePerMealMap.has(m._id.toString()) ? ratePerMealMap.get(m._id.toString()) : 0
        }))
        return mealsWithRate;
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get all meals with customer rate' })
    @ApiOkResponse({ description: 'Retrieved all meals successfully.', type: [Meal] })
    @ApiBadRequestResponse({ description: 'Error retrieving meals. Please try again later.' })
    @Get('my-rating/:userId')
    async findAllWithByWithCutomerRate(@Param('userId') userId: string): Promise<any[]> {
        const meals = await this.mealService.findAll();
        const ratePerMeal = await this.mealRatingService.getAverageRatingPerMeal();
        const customerRatePerMeal = await this.mealRatingService.findByUserId(userId);

        const myRatePerMealMap = new Map<string, number>();
        for (const meal of customerRatePerMeal) {
            myRatePerMealMap.set(meal.meal.toString(), meal.rating);
        }

        const ratePerMealMap = new Map<string, number>();
        for (const { mealId, rating } of ratePerMeal) {
            ratePerMealMap.set(mealId.toString(), rating);
        }

        const mealsWithRate = meals.map(m => ({
            _id: m._id,
            name: m.name,
            chef: m.chef,
            description: m.description,
            image: m.image,
            rating: ratePerMealMap.has(m._id.toString()) ? ratePerMealMap.get(m._id.toString()) : 0,
            your_rating: myRatePerMealMap.has(m._id.toString()) ? myRatePerMealMap.get(m._id.toString()) : 0
        }))
        return mealsWithRate;
    }


    @UseGuards(JwtAuthGuard)
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
            description: meal.description,
            image: meal.image,
            rating: rate
        };
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Rate a meal' })
    @ApiCreatedResponse({ status: 201, description: 'For rate a meal', type: MealRating })
    @ApiBadRequestResponse({ description: 'A rating for this meal by this user already exists. Invalid rating value. Rating should be between 1 and 5.' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                user: { type: 'string' },
                meal: { type: 'string' },
                rating: { type: 'string' },
            },
            required: ['user', 'meal', 'rating'],
            example: {
                user: '63fa9196b9c83225bfa94f32',
                meal: '63facd342813c8ced55b0862',
                rating: 4
            },
        }
    })
    @Post("/rate")
    async rateMeal(@Body() mealRating: MealRating): Promise<MealRating> {
        const createdMealRating = await this.mealRatingService.create(mealRating.meal, mealRating.user, mealRating.rating);
        return createdMealRating;
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update a meal' })
    @ApiOkResponse({ description: 'The meal has been successfully updated.', type: Meal })
    @ApiBadRequestResponse({ description: 'Invalid request body or missing required fields. Please check the request and try again.' })
    @Put(':id')
    async update(@Param('id') mealId: string, @Body() meal: Meal): Promise<Meal> {
        const updatedMeal = await this.mealService.update(mealId, meal);
        return updatedMeal;
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete a meal' })
    @ApiOkResponse({ description: 'The meal has been successfully deleted.' })
    @ApiBadRequestResponse({ description: 'Error deleting meal. Please try again later.' })
    @Delete(':id')
    async delete(@Param('id') mealId: string): Promise<void> {
        await this.mealService.delete(mealId);
    }

}




