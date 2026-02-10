export declare const AUDIT_LOG_KEY = "audit_log";
export interface AuditLogMetadata {
    action: string;
    resource: string;
    description?: string;
    includeBody?: boolean;
    includeResponse?: boolean;
}
export declare const AuditLog: (action: string, resource: string, options?: Partial<Omit<AuditLogMetadata, "action" | "resource">>) => import("@nestjs/common").CustomDecorator<string>;
export declare const AuditCreate: (resource: string, options?: Partial<Omit<AuditLogMetadata, "action" | "resource">>) => import("@nestjs/common").CustomDecorator<string>;
export declare const AuditUpdate: (resource: string, options?: Partial<Omit<AuditLogMetadata, "action" | "resource">>) => import("@nestjs/common").CustomDecorator<string>;
export declare const AuditDelete: (resource: string, options?: Partial<Omit<AuditLogMetadata, "action" | "resource">>) => import("@nestjs/common").CustomDecorator<string>;
export declare const AuditView: (resource: string, options?: Partial<Omit<AuditLogMetadata, "action" | "resource">>) => import("@nestjs/common").CustomDecorator<string>;
