export class SignUpRequest {
    name!: string;
    email!: string;
    password!: string;
    image?: string;

    constructor(name: string, email: string, password: string, image: string = '') {
        this.name = name;
        this.email = email;
        this.password = password;
        this.image = image
    }
}