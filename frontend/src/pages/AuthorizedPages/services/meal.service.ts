import axiosClient from "../../../utilities/apiClient";
import { MealDto, MealRatingDto } from "../../../models";


const url = '/meals';

export function createMeal(name: string, chef: string, description?: string, image?: string) {
    const body = new MealDto({ name, chef, description, image });
    return axiosClient.post(url, JSON.stringify(body));
}

export function getAllMeals(): Promise<any> {
    return axiosClient.get(url);
}

export function deleteMeal(mealId: string): Promise<any> {
    return axiosClient.delete(`${url}/${mealId}`);
}

export function getAllMealsByChef(chefId: string): Promise<any> {
    return axiosClient.get(`${url}?chefId=${chefId}`);
}

export function getMyRatingMeals(userId: string): Promise<any> {
    return axiosClient.get(`${url}/my-rating/${userId}`);
}

export function rateMeal(mealId: string, userId: string, rate: number): Promise<any> {
    const body = new MealRatingDto({ meal: mealId, user: userId, rating: rate })
    return axiosClient.post(`${url}/rate`, body);
}