
export interface JwtPayload {
    sub: string;
    userId: string;
    email: string;
    role: string;
    centerId?: string;
    permissions?: string[];
    [key: string]: any;
}
