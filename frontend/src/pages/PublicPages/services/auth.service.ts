import { Roles } from "../../../models";
import axiosClient from "../../../utilities/apiClient";
import { SignInRequest } from "../models/sign-in.model";
import { SignUpRequest } from "../models/sign-up.model";

export function signIn(email: string, password: string) {
    const body = new SignInRequest(email, password);
    return axiosClient.post('/auth/login', JSON.stringify(body))
}

export function signUp(name: string, email: string, password: string, image: string = '', role: string = Roles.CUSTOMER): Promise<any> {
    const body = new SignUpRequest(name, email, password, image, role);
    return axiosClient.post('/auth/register', JSON.stringify(body));
}
