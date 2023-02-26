import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDTO, RegisterDTO } from '../auth.dto';
import { UserService } from 'src/auth/services/user.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Get } from '@nestjs/common/decorators';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from '../jwt-auth.guard';

@ApiTags('Login Controller')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) { }

    @Post('login')
    @ApiOperation({ summary: 'Login user account and get a new token' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string', example: 'user@example.com' },
                password: { type: 'string', example: 'myPassword123' },
            },
            required: ['email', 'password'],
        },
    })
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
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'John Doe' },
                email: { type: 'string', example: 'user@example.com' },
                role: { type: 'string', example: 'user' },
                password: { type: 'string', example: 'myPassword123' },
                image: { type: 'string', example: 'https://url.example/image.png' },
            },
            required: ['name', 'email', 'password'],
        },
    })
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