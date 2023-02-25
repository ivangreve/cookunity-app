export interface Chef {
    _id: string;
    name: string;
    email: string;
}

export interface Meal {
    _id: string;
    name: string;
    chef: Chef;
    description: string;
    image: string;
    rating: number;
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
}