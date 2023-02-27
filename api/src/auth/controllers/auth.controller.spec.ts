import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth.module';
import { User, UserModel } from '../schema/user.schema';
import { UserService } from '../services/user.service';
import { AuthController } from './auth.controller';

describe('UsersController', () => {
    let controller: AuthController;
    let usersService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AuthModule]
        })
            .overrideProvider(getModelToken('User'))
            .useValue(jest.fn())
            .compile();

        controller = module.get<AuthController>(AuthController);
        usersService = module.get<UserService>(UserService);
    });


    describe('Register', () => {
        it('should return token and user value', async () => {
            jest.spyOn(usersService, 'create').mockImplementation(() =>
                Promise.resolve({ name: 'example' } as unknown as Promise<User>));

            const userCreated = await controller.register({ name: 'Ivan', email: 'ivan@gmail.com' } as UserModel);

            expect(userCreated).toHaveProperty('token');
            expect(userCreated).toHaveProperty('user');
            expect(usersService.create).toHaveBeenCalledTimes(1);
        })

        it('register with wrong Role, should thow an Error', async () => {
            jest.spyOn(usersService, 'create').mockImplementation(() =>
                Promise.resolve({ name: 'Juan', email: 'Juan@gmail.com' } as unknown as Promise<User>));

            try {
                const result = await controller.register(
                    { name: 'Juan', email: 'Juan@gmail.com', role: "NOT_EXISTING_ROLE" } as UserModel)
                expect(true).toBe(false);
            } catch (e) {
                expect(e.message).toBe("Invalid Role!");
            }
        })
    })

    describe('Login', () => {
        it('should return a user login data', async () => {
            const loginMockDto = { email: 'ivan@gmail.com', password: 'password' };

            jest.spyOn(usersService, 'findByLogin').mockImplementation(() =>
                Promise.resolve(loginMockDto as unknown as Promise<User>));

            const userCreated = await controller.login(loginMockDto);

            expect(userCreated).toHaveProperty("token");
            expect(userCreated).toHaveProperty("user");
            expect(usersService.findByLogin).toHaveBeenCalledTimes(1);

        })

    })
});