"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSensitivityScore = calculateSensitivityScore;
exports.getSensitivityLevel = getSensitivityLevel;
exports.isAutoApprovalEligible = isAutoApprovalEligible;
exports.getSensitivityWarnings = getSensitivityWarnings;
const SENSITIVITY_WEIGHTS = {
    demographics: 10,
    demographicsIdentifiable: 40,
    clinicalPresentation: 5,
    diagnosisClassification: 5,
    stagingData: 5,
    diagnosticInvestigations: 10,
    treatmentManagement: 10,
    followUpOutcomes: 10,
    clinicalPhotosImaging: 35,
    cpcRecords: 5,
};
function calculateSensitivityScore(dataFields) {
    let totalScore = 0;
    let selectedCategories = 0;
    Object.entries(dataFields).forEach(([category, fieldData]) => {
        if (fieldData && fieldData.selected) {
            const weight = SENSITIVITY_WEIGHTS[category] || 0;
            totalScore += weight;
            selectedCategories++;
        }
    });
    if (selectedCategories === 0) {
        return 0;
    }
    return Math.min(totalScore, 100);
}
function getSensitivityLevel(score) {
    if (score <= 25)
        return 'LOW';
    if (score <= 50)
        return 'MEDIUM';
    if (score <= 75)
        return 'HIGH';
    return 'VERY HIGH';
}
function isAutoApprovalEligible(dataFields, irbApproved) {
    const score = calculateSensitivityScore(dataFields);
    if (!irbApproved) {
        return false;
    }
    if (score > 25) {
        return false;
    }
    if (dataFields.demographicsIdentifiable?.selected) {
        return false;
    }
    if (dataFields.clinicalPhotosImaging?.selected) {
        return false;
    }
    return true;
}
function getSensitivityWarnings(dataFields) {
    const warnings = [];
    if (dataFields.demographicsIdentifiable?.selected) {
        warnings.push('Request includes direct identifiers (NIK/Full Name/Address) - requires IRB approval and extra justification');
    }
    if (dataFields.clinicalPhotosImaging?.selected) {
        warnings.push('Request includes clinical photos/imaging files - requires patient consent verification and extra approval');
    }
    const score = calculateSensitivityScore(dataFields);
    if (score > 75) {
        warnings.push('This is a VERY HIGH sensitivity request - expect longer review time and possible additional requirements');
    }
    return warnings;
}
//# sourceMappingURL=sensitivity-scorer.js.map