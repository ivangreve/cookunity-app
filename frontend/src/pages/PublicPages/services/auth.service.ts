import axiosClient from "../../../utilities/apiClient";
import { SignInRequest } from "../models/sign-in.model";
import { SignUpRequest } from "../models/sign-up.model";
import { LocalStorageManager } from "../../../utilities";

export async function signIn(email: string, password: string) {
    const body = new SignInRequest(email, password);

    const response = await axiosClient.post('/auth/login', JSON.stringify(body))
    return response;

    //.then(response => {
    // const token = response.data.token;

    // const localStorageManager = new LocalStorageManager();
    // localStorageManager.setToken(token);
    //return response;
    //});
}

export function signUp(name: string, email: string, password: string): Promise<any> {
    const body = new SignUpRequest(name, email, password);

    return axiosClient.post('/auth/register', JSON.stringify(body));
}
