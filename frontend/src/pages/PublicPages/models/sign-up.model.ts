import { Roles } from "../../../models";

export class SignUpRequest {
    name!: string;
    email!: string;
    password!: string;
    image?: string;
    role?: string;

    constructor(name: string, email: string, password: string, image: string = '', role: string = Roles.CUSTOMER) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.image = image;
        this.role = role;
    }
}