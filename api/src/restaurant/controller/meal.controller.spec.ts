import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { Meal } from '../schemas/meal.scheme';
import { MealRating } from '../schemas/meat-rating.schema';
import { MealRatingService } from '../services/meal-rating.service';
import { MealService } from '../services/meal.service';
import { MealController } from './meal.controller';


describe('MealController', () => {
    let controller: MealController;
    let mealService: MealService;
    let mealRatingService: MealRatingService;

    const mealMockId = new Types.ObjectId();
    const chefMockId = new Types.ObjectId();
    const userMockId = new Types.ObjectId();

    const mockMeal: Meal = {
        _id: mealMockId,
        name: 'Spaghetti Carbonara',
        chef: chefMockId,
        description: 'A classic Italian pasta dish made with eggs, Parmesan cheese, bacon, and black pepper.',
        image: 'https://url.example.jpg',
    };

    const mockRatingMeal: MealRating = {
        user: userMockId,
        meal: mealMockId,
        rating: 4
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MealController],
            providers: [
                {
                    provide: MealService,
                    useValue: {
                        create: jest.fn().mockResolvedValue(mockMeal),
                        findAll: jest.fn().mockResolvedValue([mockMeal]),
                        findById: jest.fn().mockResolvedValue(mockMeal),
                    },
                },
                {
                    provide: MealRatingService,
                    useValue: {
                        create: jest.fn().mockResolvedValue(mockRatingMeal),
                        getAverageRatingPerMeal: jest.fn().mockResolvedValue([]),
                        getAverageRatingByMealId: jest.fn().mockResolvedValue(0),
                        findByUserId: jest.fn().mockResolvedValue([]),
                    },
                },
            ],
        }).compile();

        controller = module.get<MealController>(MealController);
        mealService = module.get<MealService>(MealService);
        mealRatingService = module.get<MealRatingService>(MealRatingService);
    });

    describe('create', () => {
        it('should create a meal successfully', async () => {
            const result = await controller.create(mockMeal);
            expect(mealService.create).toHaveBeenCalledWith(mockMeal);
            expect(result).toEqual(mockMeal);
        });
    });

    describe('findAll', () => {
        it('should get all meals successfully', async () => {
            const result = await controller.findAll();
            expect(mealService.findAll).toHaveBeenCalledWith(undefined);
            expect(mealRatingService.getAverageRatingPerMeal).toHaveBeenCalled();
            expect(result).toEqual([
                {
                    ...mockMeal,
                    rating: 0,
                },
            ]);
        });

        it('should get all meals filtered by chefId successfully', async () => {
            const result = await controller.findAll(chefMockId.toString());
            expect(mealService.findAll).toHaveBeenCalledWith(chefMockId.toString());
            expect(mealRatingService.getAverageRatingPerMeal).toHaveBeenCalled();
            expect(result).toEqual([
                {
                    ...mockMeal,
                    rating: 0,
                },
            ]);
        });
    });


    describe('findById', () => {
        it('should get a meal by id successfully', async () => {
            const mealId = mealMockId.toString();
            const result = await controller.findById(mealId);
            expect(mealService.findById).toHaveBeenCalledWith(mealId);
            expect(mealRatingService.getAverageRatingByMealId).toHaveBeenCalledWith(mealMockId);
            expect(result).toEqual({
                ...mockMeal,
                rating: 0,
            });
        });
    });

    describe('rateMeal', () => {
        it('should rate a meal successfully', async () => {
            const rating = 4;
            const result = await controller.rateMeal(new MealRating(mealMockId, userMockId, rating));
            expect(result).toEqual({
                user: userMockId,
                meal: mealMockId,
                rating: 4
            });
            expect(mealRatingService.create).toHaveBeenCalledTimes(1);
        });

    });
});