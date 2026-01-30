import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
    @Get('status')
    @ApiOperation({ summary: 'Server Status' })
    @ApiResponse({ status: 200, description: 'Server is running' })
    getHello(): any {
        return {
            status: 'success',
            message: 'INAMSOS API is running',
            version: '1.0.0',
            api_base: '/api/v1',
            docs: '/api/docs'
        };
    }
}
