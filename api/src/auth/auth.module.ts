import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './services/user.service';
import { UserSchema } from './schema/user.schema';
import { UserSeed } from './seeds/user.seed';
import { CommandModule } from 'nestjs-command';


@Module({
    imports: [
        CommandModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
        MongooseModule.forFeature([{
            name: 'User',
            schema: UserSchema
        }]),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, UserService, UserSeed],
    exports: [UserService, UserSeed]

})

export class AuthModule { }
