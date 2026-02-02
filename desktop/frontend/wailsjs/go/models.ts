export namespace main {
	
	export class BackupInfo {
	    backupPath: string;
	    timestamp: string;
	    version: string;
	    size: number;
	
	    static createFrom(source: any = {}) {
	        return new BackupInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.backupPath = source["backupPath"];
	        this.timestamp = source["timestamp"];
	        this.version = source["version"];
	        this.size = source["size"];
	    }
	}
	export class LoginResult {
	    success: boolean;
	    message: string;
	    // Go type: struct { ID string "json:\"id\""; Email string "json:\"email\""; Name string "json:\"name\""; Role string "json:\"role\""; CenterID string "json:\"centerId\"" }
	    user?: any;
	
	    static createFrom(source: any = {}) {
	        return new LoginResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.success = source["success"];
	        this.message = source["message"];
	        this.user = this.convertValues(source["user"], Object);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class UpdateInfo {
	    updateAvailable: boolean;
	    currentVersion: string;
	    latestVersion: string;
	    mandatory: boolean;
	    downloadUrl: string;
	    releaseDate: string;
	    changelog: string[];
	    message?: string;
	
	    static createFrom(source: any = {}) {
	        return new UpdateInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.updateAvailable = source["updateAvailable"];
	        this.currentVersion = source["currentVersion"];
	        this.latestVersion = source["latestVersion"];
	        this.mandatory = source["mandatory"];
	        this.downloadUrl = source["downloadUrl"];
	        this.releaseDate = source["releaseDate"];
	        this.changelog = source["changelog"];
	        this.message = source["message"];
	    }
	}

}

