export interface UserLoginResponse {
    user: User;
    token: string;
}

interface User {
    name: string;
    email: string;
    password: string;
    _id: string;
    createdAt: string;
}