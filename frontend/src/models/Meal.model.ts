export class Meal {
    id!: number;
    name!: string;
    chef!: string;
    description?: string;
    rating!: {
        average: number;
        count: number;
    };
    image?: string;

    constructor(data: Partial<Meal> = {}) {
        Object.assign(this, data)
    }
}