"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditView = exports.AuditDelete = exports.AuditUpdate = exports.AuditCreate = exports.AuditLog = exports.AUDIT_LOG_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.AUDIT_LOG_KEY = 'audit_log';
const AuditLog = (action, resource, options) => {
    const metadata = {
        action,
        resource,
        description: options?.description,
        includeBody: options?.includeBody ?? false,
        includeResponse: options?.includeResponse ?? false,
    };
    return (0, common_1.SetMetadata)(exports.AUDIT_LOG_KEY, metadata);
};
exports.AuditLog = AuditLog;
const AuditCreate = (resource, options) => (0, exports.AuditLog)('CREATE', resource, options);
exports.AuditCreate = AuditCreate;
const AuditUpdate = (resource, options) => (0, exports.AuditLog)('UPDATE', resource, options);
exports.AuditUpdate = AuditUpdate;
const AuditDelete = (resource, options) => (0, exports.AuditLog)('DELETE', resource, options);
exports.AuditDelete = AuditDelete;
const AuditView = (resource, options) => (0, exports.AuditLog)('VIEW', resource, options);
exports.AuditView = AuditView;
//# sourceMappingURL=audit-log.decorator.js.map