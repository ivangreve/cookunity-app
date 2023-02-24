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
            name: "Chef User",
            email: "chef@cookunity.com",
            role: "CHEF",
            password: "chef"
        });
        console.log(userChef);

        const userCustomer = await this.userService.create({
            name: "Customer User",
            email: "customer@cookunity.com",
            role: "CUSTOMER",
            password: "customer"
        });
        console.log(userCustomer);
    }
}