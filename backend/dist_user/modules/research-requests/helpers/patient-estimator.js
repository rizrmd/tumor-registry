"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimatePatientCount = estimatePatientCount;
exports.validateFilters = validateFilters;
async function estimatePatientCount(prisma, filters) {
    const whereClause = {
        isActive: true,
    };
    if (filters.periodStart || filters.periodEnd) {
        whereClause.createdAt = {};
        if (filters.periodStart) {
            whereClause.createdAt.gte = new Date(filters.periodStart);
        }
        if (filters.periodEnd) {
            whereClause.createdAt.lte = new Date(filters.periodEnd);
        }
    }
    if (filters.tumorTypes && filters.tumorTypes.length > 0) {
        whereClause.pathologyType = {
            in: filters.tumorTypes,
        };
    }
    if (filters.whoClassifications && filters.whoClassifications.length > 0) {
        whereClause.OR = [
            {
                whoBoneTumorId: {
                    in: filters.whoClassifications,
                },
            },
            {
                whoSoftTissueTumorId: {
                    in: filters.whoClassifications,
                },
            },
        ];
    }
    if (filters.ennekingStages && filters.ennekingStages.length > 0) {
        whereClause.ennekingStage = {
            in: filters.ennekingStages,
        };
    }
    if (filters.ajccStages && filters.ajccStages.length > 0) {
        whereClause.ajccStage = {
            in: filters.ajccStages,
        };
    }
    if (filters.ageMin !== undefined || filters.ageMax !== undefined) {
        const now = new Date();
        if (filters.ageMin !== undefined && filters.ageMax !== undefined) {
            const maxDate = new Date(now.getFullYear() - filters.ageMin, now.getMonth(), now.getDate());
            const minDate = new Date(now.getFullYear() - filters.ageMax - 1, now.getMonth(), now.getDate());
            whereClause.dateOfBirth = {
                gte: minDate,
                lte: maxDate,
            };
        }
        else if (filters.ageMin !== undefined) {
            const maxDate = new Date(now.getFullYear() - filters.ageMin, now.getMonth(), now.getDate());
            whereClause.dateOfBirth = {
                lte: maxDate,
            };
        }
        else if (filters.ageMax !== undefined) {
            const minDate = new Date(now.getFullYear() - filters.ageMax - 1, now.getMonth(), now.getDate());
            whereClause.dateOfBirth = {
                gte: minDate,
            };
        }
    }
    if (filters.genders && filters.genders.length > 0) {
        whereClause.gender = {
            in: filters.genders,
        };
    }
    if (filters.centerIds && filters.centerIds.length > 0) {
        whereClause.centerId = {
            in: filters.centerIds,
        };
    }
    try {
        const count = await prisma.patient.count({
            where: whereClause,
        });
        return count;
    }
    catch (error) {
        console.error('Error estimating patient count:', error);
        return 0;
    }
}
function validateFilters(filters) {
    const errors = [];
    if (filters.periodStart && filters.periodEnd) {
        const start = new Date(filters.periodStart);
        const end = new Date(filters.periodEnd);
        if (start > end) {
            errors.push('Period start date must be before end date');
        }
        const yearDiff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365);
        if (yearDiff > 20) {
            errors.push('Period range cannot exceed 20 years');
        }
    }
    if (filters.ageMin !== undefined && filters.ageMax !== undefined) {
        if (filters.ageMin > filters.ageMax) {
            errors.push('Minimum age cannot be greater than maximum age');
        }
    }
    return errors;
}
//# sourceMappingURL=patient-estimator.js.map