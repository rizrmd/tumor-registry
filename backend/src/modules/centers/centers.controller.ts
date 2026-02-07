import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CentersService } from './centers.service';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { PermissionsGuard } from '@/auth/guards/permissions.guard';
import { RequirePermissions } from '@/auth/decorators/permissions.decorator';
import { AuditLog } from '@/common/decorators/audit-log.decorator';
import { JwtPayload } from '@/auth/interfaces/jwt-payload.interface';

@ApiTags('Centers')
@Controller('centers')
export class CentersController {
  constructor(private readonly centersService: CentersService) { }

  @Get()
  @ApiOperation({ summary: 'Get all centers (Public - no auth required)' })
  @ApiResponse({ status: 200, description: 'Centers retrieved successfully' })
  @ApiQuery({ name: 'includeInactive', required: false, type: Boolean })
  async findAll(@Query('includeInactive') includeInactive?: string) {
    const include = includeInactive === 'true';
    return await this.centersService.findAll(include);
  }

  /**
   * Get remote database configuration for the authenticated user's center
   * Used by desktop app to configure remote sync
   */
  @Get('my/remote-db-config')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get remote database config for current user center (Desktop)' })
  @ApiResponse({ status: 200, description: 'Remote DB config retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'User has no center assigned' })
  @ApiResponse({ status: 404, description: 'No remote DB config found for center' })
  async getMyRemoteDbConfig(@Req() req: { user: JwtPayload }) {
    const centerId = req.user.centerId;
    
    if (!centerId) {
      throw new ForbiddenException('User has no center assigned');
    }

    const config = await this.centersService.getRemoteDbConfig(centerId);
    
    if (!config) {
      return {
        enabled: false,
        message: 'No remote database configured for this center',
      };
    }

    return {
      enabled: true,
      url: config.url,
      apiKey: config.apiKey,
    };
  }

  @Get('statistics')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiOperation({ summary: 'Get center statistics' })
  @ApiResponse({ status: 200, description: 'Center statistics retrieved successfully' })
  @RequirePermissions('CENTERS_READ')
  async getStatistics() {
    return await this.centersService.getStatistics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get center by ID (Public - no auth required)' })
  @ApiParam({ name: 'id', description: 'Center ID' })
  @ApiResponse({ status: 200, description: 'Center retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Center not found' })
  @ApiQuery({ name: 'includeUsers', required: false, type: Boolean })
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('includeUsers') includeUsers?: string,
  ) {
    const include = includeUsers === 'true';
    return await this.centersService.findById(id, include);
  }

  @Get(':id/users')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiOperation({ summary: 'Get center users' })
  @ApiParam({ name: 'id', description: 'Center ID' })
  @ApiResponse({ status: 200, description: 'Center users retrieved successfully' })
  @RequirePermissions('USERS_READ')
  async getCenterUsers(@Param('id', ParseUUIDPipe) id: string) {
    return await this.centersService.getCenterUsers(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiOperation({ summary: 'Create new center' })
  @ApiResponse({ status: 201, description: 'Center created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 409, description: 'Center already exists' })
  @RequirePermissions('CENTERS_CREATE')
  @HttpCode(HttpStatus.CREATED)
  @AuditLog('CREATE', 'center')
  async create(@Body() createCenterDto: {
    name: string;
    code: string;
    province: string;
    regency?: string;
    address?: string;
    mrPrefix: string;
  }) {
    return await this.centersService.create(createCenterDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiOperation({ summary: 'Update center' })
  @ApiParam({ name: 'id', description: 'Center ID' })
  @ApiResponse({ status: 200, description: 'Center updated successfully' })
  @ApiResponse({ status: 404, description: 'Center not found' })
  @ApiResponse({ status: 409, description: 'Cannot modify default center' })
  @RequirePermissions('CENTERS_UPDATE')
  @AuditLog('UPDATE', 'center')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCenterDto: {
      name?: string;
      province?: string;
      regency?: string;
      address?: string;
      isActive?: boolean;
    },
  ) {
    return await this.centersService.update(id, updateCenterDto);
  }

  @Put(':id/activate')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiOperation({ summary: 'Activate center' })
  @ApiParam({ name: 'id', description: 'Center ID' })
  @ApiResponse({ status: 200, description: 'Center activated successfully' })
  @ApiResponse({ status: 404, description: 'Center not found' })
  @RequirePermissions('CENTERS_UPDATE')
  @AuditLog('ACTIVATE', 'center')
  async activate(@Param('id', ParseUUIDPipe) id: string) {
    return await this.centersService.activate(id);
  }

  @Put(':id/deactivate')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiOperation({ summary: 'Deactivate center' })
  @ApiParam({ name: 'id', description: 'Center ID' })
  @ApiResponse({ status: 200, description: 'Center deactivated successfully' })
  @ApiResponse({ status: 404, description: 'Center not found' })
  @ApiResponse({ status: 409, description: 'Cannot deactivate default center' })
  @RequirePermissions('CENTERS_UPDATE')
  @AuditLog('DEACTIVATE', 'center')
  async deactivate(@Param('id', ParseUUIDPipe) id: string) {
    return await this.centersService.deactivate(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiOperation({ summary: 'Delete center' })
  @ApiParam({ name: 'id', description: 'Center ID' })
  @ApiResponse({ status: 204, description: 'Center deleted successfully' })
  @ApiResponse({ status: 404, description: 'Center not found' })
  @ApiResponse({ status: 409, description: 'Cannot delete default center or centers with active users' })
  @RequirePermissions('CENTERS_DELETE')
  @HttpCode(HttpStatus.NO_CONTENT)
  @AuditLog('DELETE', 'center')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.centersService.delete(id);
  }

  /**
   * Admin endpoint to update remote database configuration for a center
   */
  @Put(':id/remote-db-config')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiOperation({ summary: 'Update remote database config for a center (Admin)' })
  @ApiParam({ name: 'id', description: 'Center ID' })
  @ApiResponse({ status: 200, description: 'Remote DB config updated successfully' })
  @ApiResponse({ status: 404, description: 'Center not found' })
  @RequirePermissions('CENTERS_UPDATE')
  @AuditLog('UPDATE', 'center_remote_config')
  async updateRemoteDbConfig(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() configDto: {
      remoteDbUrl?: string | null;
      remoteDbApiKey?: string | null;
    },
  ) {
    return await this.centersService.updateRemoteDbConfig(id, configDto);
  }
}
