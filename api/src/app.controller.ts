import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller()
export class AppController {
  constructor() { }

  @Get("healthcheck")
  @ApiOperation({ summary: 'Endpoint to check if api is alive' })
  getHello(): any {
    return {
      status: true,
      description: "Api is Alive! 😊🎉"
    }
  }
}
