import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { UserService } from 'src/auth/services/user.service';


@Injectable()
export class UserSeed {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Command({ command: 'create:user', describe: 'create a user' })
    async create() {
        const userChef = await this.userService.create({
            name: "Donato de Santis",
            email: "donato@cookunity.com",
            role: "CHEF",
            password: "chef",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpYeiftn_mBq8eomPq1_TB4Eb0MiPKkpEHIhW9obEvrVZO0vlU"
        });
        console.log(userChef);


        const secondChef = await this.userService.create({
            name: "Christophe Krywonis",
            email: "christophe@cookunity.com",
            role: "CHEF",
            password: "chef",
            image: "https://aptus.com.ar/wp-content/uploads/2018/10/christophe-masterchef3.jpg"
        });
        console.log(secondChef);


        const userCustomer = await this.userService.create({
            name: "Ivan Greve",
            email: "ivangreve@gmail.com",
            role: "CUSTOMER",
            password: "1234",
            image: "https://ivangreve.com/profile.jpg"
        });
        console.log(userCustomer);
    }
}

