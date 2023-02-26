export interface Chef {
    _id: string;
    name: string;
    email: string;
    image: string;
}

export interface Meal {
    _id: string;
    name: string;
    chef: Chef;
    description: string;
    image: string;
    rating: number;
    your_rating: number;
}

export class MealDto {
    constructor(data: Partial<MealDto> = {}) {
        Object.assign(this, data)
    }
    name!: string;
    chef!: string;
    description?: string;
    image?: string;
    rating?: number;
    your_rating?: number;
}

export class MealRatingDto {
    constructor(data: Partial<MealRatingDto> = {}) {
        Object.assign(this, data)
    }
    user!: string;
    meal!: string;
    rating!: number;
}