import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDTO, RegisterDTO } from '../auth.dto';
import { UserService } from 'src/auth/services/user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Get } from '@nestjs/common/decorators';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from '../jwt-auth.guard';

@ApiTags('Login Controller')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) { }

    @Post('login')
    @ApiOperation({ summary: 'Login user account and get a new token' })
    @ApiResponse({ status: 200, description: 'Login successfully.' },)
    @ApiResponse({ status: 401, description: 'Unauthorized user.' })
    async login(@Body() userDTO: LoginDTO) {
        const user = await this.userService.findByLogin(userDTO);
        const payload = {
            role: user.role,
            email: user.email,
            name: user.name,
        }

        //get a JWT authentication token from the payload
        const token = await this.authService.signPayload(payload);
        return {
            user, token
        }
    }

    // registration route
    @Post('register')
    @ApiOperation({ summary: 'Create a new User account' })
    @ApiResponse({ status: 200, description: 'User register successfully.' })
    async register(@Body() userDTO: RegisterDTO) {
        const user = await this.userService.create(userDTO);
        const payload = {
            email: user.email,
        }

        const token = await this.authService.signPayload(payload);
        return { user, token }
    }

    @UseGuards(JwtAuthGuard)
    @Get('authorized-endpoint-check')
    @ApiOperation({ summary: 'Mocked endpoint to check authorized request' })
    @ApiResponse({ status: 200, description: 'Is an authorized User' })
    @ApiResponse({ status: 401, description: 'Is an unauthorized user' })
    async authorizedEndpoint() {
        return 'You are logged in!'
    }
}