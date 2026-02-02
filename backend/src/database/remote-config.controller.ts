import { Controller, Post, Body, UseGuards, Logger, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { RemoteConfigService } from './remote-config.service';
import { JwtPayload } from '@/auth/interfaces/jwt-payload.interface';

interface UpdateTokenDto {
  jwtToken: string;
}

@ApiTags('Remote Sync')
@Controller('remote-sync')
export class RemoteConfigController {
  private readonly logger = new Logger(RemoteConfigController.name);

  constructor(private readonly remoteConfigService: RemoteConfigService) {}

  @Post('update-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update JWT token for remote sync (Desktop)' })
  @ApiResponse({ status: 200, description: 'Token updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateToken(
    @Body() dto: UpdateTokenDto,
    @Req() req: { user: JwtPayload },
  ) {
    // Validate the user has a center assigned
    if (!req.user.centerId) {
      return {
        success: false,
        message: 'User has no center assigned',
        enabled: false,
      };
    }

    // Update the stored token for remote sync
    this.remoteConfigService.setJwtToken(dto.jwtToken);
    this.remoteConfigService.clearCache();
    
    this.logger.log(`Remote sync token updated for user: ${req.user.email}`);
    
    // Try to fetch config with new token
    const config = await this.remoteConfigService.fetchRemoteDbConfig();
    
    if (config?.enabled) {
      this.logger.log('Remote sync configured successfully');
      return {
        success: true,
        message: 'Remote sync configured successfully',
        enabled: true,
        centerId: req.user.centerId,
      };
    }

    return {
      success: true,
      message: 'Token updated, but remote sync is not enabled for this center',
      enabled: false,
      centerId: req.user.centerId,
    };
  }

  @Post('status')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get remote sync status' })
  @ApiResponse({ status: 200, description: 'Status retrieved' })
  async getStatus() {
    const isEnabled = this.remoteConfigService.isRemoteDbEnabled();
    const url = this.remoteConfigService.getRemoteDbUrl();
    
    return {
      enabled: isEnabled,
      hasUrl: !!url,
      // Don't expose the actual URL for security
      urlMask: url ? url.replace(/:\/\/.*@/, '://***@') : null,
    };
  }
}
