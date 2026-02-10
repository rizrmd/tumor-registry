export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
    centerId?: string;
    permissions?: string[];
    iat?: number;
    exp?: number;
}
