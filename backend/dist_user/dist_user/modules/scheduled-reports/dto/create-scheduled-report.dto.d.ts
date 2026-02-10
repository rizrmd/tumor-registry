declare class RecipientDto {
    type: 'USER' | 'ROLE' | 'EMAIL' | 'GROUP';
    value: string;
    personalization?: Record<string, any>;
}
export declare class CreateScheduledReportDto {
    templateId: string;
    name: string;
    description?: string;
    schedule: string;
    recipients: RecipientDto[];
    parameters?: Record<string, any>;
    format: 'PDF' | 'EXCEL' | 'CSV' | 'JSON' | 'HTML';
    deliveryMethod: 'EMAIL' | 'FILE_SHARE' | 'API_WEBHOOK' | 'SFTP' | 'CLOUD_STORAGE';
    isActive?: boolean;
    createdBy: string;
}
export {};
