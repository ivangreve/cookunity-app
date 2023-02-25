import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Meal } from '../schemas/meal.scheme';
import { MealService } from '../services/meal.service';

@ApiTags('Meals')
@Controller('meals')
export class MealController {
    constructor(private mealService: MealService) { }

    @ApiCreatedResponse({ description: 'The meal has been successfully created.', type: Meal })
    @ApiBadRequestResponse({ description: 'Invalid request body or missing required fields. Please check the request and try again.' })
    @Post()
    async create(@Body() meal: Meal): Promise<Meal> {
        const createdMeal = await this.mealService.create(meal);
        return createdMeal;
    }

    @ApiOkResponse({ description: 'Retrieved all meals successfully.', type: [Meal] })
    @ApiBadRequestResponse({ description: 'Error retrieving meals. Please try again later.' })
    @Get()
    async findAll(): Promise<Meal[]> {
        const meals = await this.mealService.findAll();
        return meals;
    }

    @ApiOkResponse({ description: 'Retrieved a meal by id successfully.', type: Meal })
    @ApiNotFoundResponse({ description: 'No meal found with the specified id. Please check the id and try again.' })
    @ApiBadRequestResponse({ description: 'Error retrieving meal. Please try again later.' })
    @Get(':id')
    async findById(@Param('id') id: number): Promise<Meal> {
        const meal = await this.mealService.findById(id);
        return meal;
    }

    @ApiOkResponse({ description: 'The meal has been successfully updated.', type: Meal })
    @ApiNotFoundResponse({ description: 'No meal found with the specified id. Please check the id and try again.' })
    @ApiBadRequestResponse({ description: 'Invalid request body or missing required fields. Please check the request and try again.' })
    @Put(':id')
    async update(@Param('id') id: number, @Body() meal: Meal): Promise<Meal> {
        const updatedMeal = await this.mealService.update(id, meal);
        return updatedMeal;

    }

    @ApiOkResponse({ description: 'The meal has been successfully deleted.' })
    @ApiNotFoundResponse({ description: 'No meal found with the specified id. Please check the id and try again.' })
    @ApiBadRequestResponse({ description: 'Error deleting meal. Please try again later.' })
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.mealService.delete(id);

    }
}




