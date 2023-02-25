import { User } from "../pages/PublicPages/models";

export class Meal {
    id!: number;
    name!: string;
    chef!: any;
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