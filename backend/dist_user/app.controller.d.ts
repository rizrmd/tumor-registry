export declare class AppController {
    private readonly desktopVersions;
    private readonly latestVersion;
    private readonly minRequiredVersion;
    getStatus(): any;
    getDesktopVersion(platform: string): {
        status: string;
        message: string;
        data?: undefined;
    } | {
        status: string;
        data: {
            downloadUrl: string;
            minRequiredVersion: string;
            platform: string;
            version: string;
            releaseDate: string;
            mandatory: boolean;
            changelog: string[];
        };
        message?: undefined;
    };
    checkDesktopUpdate(currentVersion: string): {
        status: string;
        data: {
            updateAvailable: boolean;
            currentVersion: string;
            latestVersion: string;
            message: string;
        };
    } | {
        status: string;
        data: {
            version: string;
            downloadUrl: string;
            releaseDate: string;
            mandatory: boolean;
            changelog: string[];
            minRequiredVersion?: string;
            updateAvailable: boolean;
            currentVersion: string;
            latestVersion: string;
            message?: undefined;
        };
    };
    private compareVersions;
}
