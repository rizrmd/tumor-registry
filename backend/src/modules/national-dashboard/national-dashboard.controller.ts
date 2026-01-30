import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import type { FastifyReply } from 'fastify';
import { AggregateSearchDto } from './dto/aggregate-search.dto';
import { NationalDashboardService } from './national-dashboard.service';

@ApiTags('National Dashboard')
@Controller('national-dashboard')
export class NationalDashboardController {
    constructor(private readonly dashboardService: NationalDashboardService) { }

    @Get('statistics')
    @ApiOperation({ summary: 'Get aggregated national statistics' })
    async getStatistics() {
        return this.dashboardService.getNationalStatistics();
    }

    @Get('summary')
    @ApiOperation({ summary: 'Get dashboard summary metrics' })
    async getSummary() {
        return this.dashboardService.getDashboardSummary();
    }

    @Post('search-aggregated')
    @ApiOperation({ summary: 'Filter aggregated national data' })
    async searchAggregated(@Body() filters: AggregateSearchDto) {
        return this.dashboardService.searchAggregatedData(filters);
    }

    @Post('export')
    @ApiOperation({ summary: 'Export aggregated data as CSV' })
    async exportData(@Body() filters: AggregateSearchDto, @Res() res: FastifyReply) {
        const csv = await this.dashboardService.generateExport(filters);
        res.header('Content-Type', 'text/csv');
        res.header('Content-Disposition', 'attachment; filename="analytics_export.csv"');
        return res.send(csv);
    }
}
