import axiosClient from "../../../utilities/apiClient";
import { MealDto } from "../../../models";

export function createMeal(name: string, chef: string, description?: string, image?: string) {
    const body = new MealDto({ name, chef, description, image });

    return axiosClient.post('/meals', JSON.stringify(body));
}

export function getAllMeals(): Promise<any> {
    return axiosClient.get('/meals');
}

export function getAllMealsByChef(chefId: string): Promise<any> {
    return axiosClient.get(`/meals/chef/${chefId}`);
}