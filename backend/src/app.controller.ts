import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

interface DesktopVersionInfo {
  version: string;
  downloadUrl: string;
  releaseDate: string;
  mandatory: boolean;
  changelog: string[];
  minRequiredVersion?: string;
}

@Controller()
@ApiTags('App')
export class AppController {
  // Desktop versions registry - in production, store this in database
  private readonly desktopVersions: Record<string, DesktopVersionInfo> = {
    '1.0.1': {
      version: '1.0.1',
      downloadUrl: 'https://releases.inamsos.com/desktop/inamsos-desktop-1.0.1.dmg',
      releaseDate: '2025-01-15',
      mandatory: false,
      changelog: [
        'Fixed sync indicator not showing file progress',
        'Added download sync support',
        'Improved offline mode reliability',
      ],
    },
    '1.0.2': {
      version: '1.0.2',
      downloadUrl: 'https://releases.inamsos.com/desktop/inamsos-desktop-1.0.2.dmg',
      releaseDate: '2025-01-20',
      mandatory: false,
      changelog: [
        'Enhanced full sync progress tracking',
        'Fixed bug with file upload timeouts',
        'Added auto-update checker',
      ],
    },
  };

  private readonly latestVersion = '1.0.2';
  private readonly minRequiredVersion = '1.0.0';

  @Get('status')
  @ApiOperation({ summary: 'Server Status' })
  @ApiResponse({ status: 200, description: 'Server is running' })
  getStatus(): any {
    return {
      status: 'success',
      message: 'INAMSOS API is running',
      version: '1.0.0',
      api_base: '/api/v1',
      docs: '/api/docs',
    };
  }

  @Get('version/desktop/:platform')
  @ApiOperation({ summary: 'Get latest desktop version for a platform' })
  @ApiResponse({ status: 200, description: 'Latest version info' })
  @ApiResponse({ status: 400, description: 'Invalid platform' })
  getDesktopVersion(@Param('platform') platform: string) {
    const validPlatforms = ['darwin', 'windows', 'linux'];
    if (!validPlatforms.includes(platform)) {
      return {
        status: 'error',
        message: `Invalid platform. Must be one of: ${validPlatforms.join(', ')}`,
      };
    }

    // In production, return platform-specific download URLs
    const platformExtensions = {
      darwin: '.dmg',
      windows: '.exe',
      linux: '.AppImage',
    };

    const versionInfo = this.desktopVersions[this.latestVersion];
    return {
      status: 'success',
      data: {
        ...versionInfo,
        downloadUrl: versionInfo.downloadUrl.replace(
          platformExtensions.darwin,
          platformExtensions[platform as keyof typeof platformExtensions]
        ),
        minRequiredVersion: this.minRequiredVersion,
        platform,
      },
    };
  }

  @Get('version/desktop/check/:currentVersion')
  @ApiOperation({ summary: 'Check if desktop update is available' })
  @ApiResponse({ status: 200, description: 'Update check result' })
  checkDesktopUpdate(@Param('currentVersion') currentVersion: string) {
    const needsUpdate = this.compareVersions(currentVersion, this.latestVersion) < 0;
    const isMandatory = this.compareVersions(currentVersion, this.minRequiredVersion) < 0;

    if (!needsUpdate) {
      return {
        status: 'success',
        data: {
          updateAvailable: false,
          currentVersion,
          latestVersion: this.latestVersion,
          message: 'You are running the latest version',
        },
      };
    }

    const versionInfo = this.desktopVersions[this.latestVersion];
    return {
      status: 'success',
      data: {
        updateAvailable: true,
        currentVersion,
        latestVersion: this.latestVersion,
        mandatory: isMandatory || versionInfo.mandatory,
        ...versionInfo,
      },
    };
  }

  /**
   * Compare two version strings (semver-like)
   * Returns negative if v1 < v2, 0 if equal, positive if v1 > v2
   */
  private compareVersions(v1: string, v2: string): number {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);

    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
      const part1 = parts1[i] || 0;
      const part2 = parts2[i] || 0;

      if (part1 !== part2) {
        return part1 - part2;
      }
    }

    return 0;
  }
}
