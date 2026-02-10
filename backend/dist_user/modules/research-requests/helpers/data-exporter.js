"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportPatientData = exportPatientData;
exports.convertToCSV = convertToCSV;
async function exportPatientData(prisma, options) {
    const { requestedDataFields, dataFilters, includeIdentifiableData } = options;
    const whereClause = {
        isActive: true,
    };
    if (dataFilters.periodStart || dataFilters.periodEnd) {
        whereClause.createdAt = {};
        if (dataFilters.periodStart) {
            whereClause.createdAt.gte = new Date(dataFilters.periodStart);
        }
        if (dataFilters.periodEnd) {
            whereClause.createdAt.lte = new Date(dataFilters.periodEnd);
        }
    }
    if (dataFilters.ageMin !== undefined || dataFilters.ageMax !== undefined) {
        const today = new Date();
        if (dataFilters.ageMax !== undefined) {
            const minBirthDate = new Date(today.getFullYear() - dataFilters.ageMax - 1, today.getMonth(), today.getDate());
            whereClause.dateOfBirth = { ...whereClause.dateOfBirth, gte: minBirthDate };
        }
        if (dataFilters.ageMin !== undefined) {
            const maxBirthDate = new Date(today.getFullYear() - dataFilters.ageMin, today.getMonth(), today.getDate());
            whereClause.dateOfBirth = { ...whereClause.dateOfBirth, lte: maxBirthDate };
        }
    }
    if (dataFilters.gender) {
        whereClause.gender = dataFilters.gender;
    }
    if (dataFilters.centerId) {
        whereClause.centerId = dataFilters.centerId;
    }
    if (dataFilters.tumorType) {
        whereClause.tumorType = dataFilters.tumorType;
    }
    if (dataFilters.whoBoneTumorId) {
        whereClause.whoBoneTumorId = dataFilters.whoBoneTumorId;
    }
    if (dataFilters.whoSoftTissueTumorId) {
        whereClause.whoSoftTissueTumorId = dataFilters.whoSoftTissueTumorId;
    }
    if (dataFilters.ennekingStaging) {
        whereClause.ennekingStaging = dataFilters.ennekingStaging;
    }
    const selectFields = {
        id: true,
        createdAt: true,
        updatedAt: true,
    };
    const exportedFields = ['id', 'createdAt', 'updatedAt'];
    if (requestedDataFields.demographics?.selected) {
        selectFields.dateOfBirth = true;
        selectFields.gender = true;
        selectFields.province = true;
        selectFields.regency = true;
        selectFields.district = true;
        selectFields.village = true;
        exportedFields.push('age', 'gender', 'province', 'regency', 'district', 'village');
    }
    if (requestedDataFields.demographicsIdentifiable?.selected && includeIdentifiableData) {
        selectFields.nik = true;
        selectFields.fullName = true;
        selectFields.address = true;
        selectFields.phone = true;
        exportedFields.push('nik', 'fullName', 'address', 'phone');
    }
    if (requestedDataFields.clinicalPresentation?.selected) {
        selectFields.karnofsky = true;
        selectFields.painVAS = true;
        selectFields.weight = true;
        selectFields.height = true;
        selectFields.bmi = true;
        exportedFields.push('karnofsky', 'painVAS', 'weight', 'height', 'bmi');
    }
    if (requestedDataFields.diagnosisClassification?.selected) {
        selectFields.tumorType = true;
        selectFields.whoBoneTumorId = true;
        selectFields.whoSoftTissueTumorId = true;
        selectFields.boneLocationId = true;
        selectFields.softTissueLocationId = true;
        selectFields.tumorSyndromes = true;
        selectFields.whoBoneTumor = { select: { code: true, name: true } };
        selectFields.whoSoftTissueTumor = { select: { code: true, name: true } };
        selectFields.boneLocation = { select: { name: true, level: true } };
        selectFields.softTissueLocation = { select: { name: true, region: true } };
        exportedFields.push('tumorType', 'whoBoneTumor', 'whoSoftTissueTumor', 'boneLocation', 'softTissueLocation', 'tumorSyndromes');
    }
    if (requestedDataFields.stagingData?.selected) {
        selectFields.ennekingStaging = true;
        selectFields.ajccStaging = true;
        selectFields.tumorGrade = true;
        selectFields.tumorSize = true;
        selectFields.tumorDepth = true;
        selectFields.lymphNodeInvolvement = true;
        selectFields.metastasis = true;
        selectFields.metastasisSites = true;
        exportedFields.push('ennekingStaging', 'ajccStaging', 'tumorGrade', 'tumorSize', 'tumorDepth', 'lymphNodeInvolvement', 'metastasis', 'metastasisSites');
    }
    if (requestedDataFields.diagnosticInvestigations?.selected) {
        selectFields.labAlp = true;
        selectFields.labLdh = true;
        selectFields.labCalcium = true;
        selectFields.labPhosphate = true;
        selectFields.radiologyXray = true;
        selectFields.radiologyMri = true;
        selectFields.radiologyCt = true;
        selectFields.radiologyBoneScan = true;
        selectFields.radiologyPet = true;
        selectFields.mirrelScore = true;
        selectFields.pathologyType = true;
        selectFields.huvosGrade = true;
        exportedFields.push('labAlp', 'labLdh', 'labCalcium', 'labPhosphate', 'radiologyXray', 'radiologyMri', 'radiologyCt', 'radiologyBoneScan', 'radiologyPet', 'mirrelScore', 'pathologyType', 'huvosGrade');
    }
    if (requestedDataFields.treatmentManagement?.selected) {
        selectFields.surgeryType = true;
        selectFields.limbSalvagePerformed = true;
        selectFields.surgicalMargin = true;
        selectFields.reconstructionMethod = true;
        selectFields.chemotherapyType = true;
        selectFields.chemotherapyRegimen = true;
        selectFields.radiotherapyDose = true;
        selectFields.radiotherapyFractions = true;
        exportedFields.push('surgeryType', 'limbSalvagePerformed', 'surgicalMargin', 'reconstructionMethod', 'chemotherapyType', 'chemotherapyRegimen', 'radiotherapyDose', 'radiotherapyFractions');
    }
    if (requestedDataFields.followUpOutcomes?.selected) {
        selectFields.followUpVisits = true;
        selectFields.mstsScores = true;
        selectFields.recurrenceDetected = true;
        selectFields.recurrenceDate = true;
        selectFields.complicationsReported = true;
        selectFields.survivalStatus = true;
        selectFields.survivalDate = true;
        exportedFields.push('followUpVisits', 'mstsScores', 'recurrenceDetected', 'recurrenceDate', 'complicationsReported', 'survivalStatus', 'survivalDate');
    }
    if (requestedDataFields.clinicalPhotosImaging?.selected) {
        selectFields.clinicalPhotoUrls = true;
        selectFields.radiologyImageUrls = true;
        exportedFields.push('clinicalPhotoUrls', 'radiologyImageUrls');
    }
    selectFields.center = {
        select: {
            name: true,
            province: true,
            city: true,
        },
    };
    exportedFields.push('center');
    const patients = await prisma.patient.findMany({
        where: whereClause,
        select: selectFields,
    });
    const anonymizedPatients = patients.map((patient) => {
        const anonymized = { ...patient };
        if (!includeIdentifiableData) {
            delete anonymized.nik;
            delete anonymized.fullName;
            delete anonymized.address;
            delete anonymized.phone;
            anonymized.anonymousId = `ANON-${anonymized.id.substring(0, 8)}`;
            delete anonymized.id;
        }
        if (anonymized.dateOfBirth) {
            const today = new Date();
            const birthDate = new Date(anonymized.dateOfBirth);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            anonymized.age = age;
            if (!includeIdentifiableData) {
                delete anonymized.dateOfBirth;
            }
        }
        return anonymized;
    });
    return {
        patients: anonymizedPatients,
        totalCount: anonymizedPatients.length,
        exportedFields,
    };
}
function convertToCSV(data) {
    if (data.patients.length === 0) {
        return '';
    }
    const flattenedData = data.patients.map((patient) => {
        const flattened = {};
        Object.entries(patient).forEach(([key, value]) => {
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                Object.entries(value).forEach(([nestedKey, nestedValue]) => {
                    flattened[`${key}_${nestedKey}`] = nestedValue;
                });
            }
            else if (Array.isArray(value)) {
                flattened[key] = JSON.stringify(value);
            }
            else {
                flattened[key] = value;
            }
        });
        return flattened;
    });
    const headers = Array.from(new Set(flattenedData.flatMap((row) => Object.keys(row))));
    const csvRows = [
        headers.join(','),
        ...flattenedData.map((row) => headers.map((header) => {
            const value = row[header];
            if (value === null || value === undefined)
                return '';
            const stringValue = String(value);
            if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
                return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
        }).join(',')),
    ];
    return csvRows.join('\n');
}
//# sourceMappingURL=data-exporter.js.map