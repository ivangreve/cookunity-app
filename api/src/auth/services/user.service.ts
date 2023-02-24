import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDTO, RegisterDTO } from 'src/auth/auth.dto';
import * as bcrypt from 'bcryptjs';
import { User } from '../schema/user.schema';

@Injectable()
export class UserService {
    // define a constructor to inject the model into the service
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async create(userDTO: RegisterDTO): Promise<User> {
        const { email } = userDTO;
        const user = await this.userModel.findOne({ email });
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const createdUser = new this.userModel(userDTO);
        await createdUser.save();
        return createdUser;
    }


    async findByLogin(userDTO: LoginDTO): Promise<User> {
        const { email, password } = userDTO;
        const user = await this.userModel.findOne({ email }).select('+password');
        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        const passworMatch = await bcrypt.compare(password, user.password);
        if (!passworMatch) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    async findByPayload(payload: any) {
        const { email } = payload;
        const user = await this.userModel.findOne({ email });
        return user;
    }
}

