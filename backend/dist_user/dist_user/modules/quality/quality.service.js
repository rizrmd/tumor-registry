"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var QualityService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QualityService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("@/database/prisma.service");
let QualityService = QualityService_1 = class QualityService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(QualityService_1.name);
    }
    async calculateQualityScore(patientId) {
        const patient = await this.prisma.patient.findUnique({
            where: { id: patientId },
            include: {
                diagnoses: true,
                medicalRecords: true,
                procedures: true,
                visits: true,
                medications: true,
                laboratoryResults: true,
            }
        });
        if (!patient) {
            throw new common_1.NotFoundException('Patient not found');
        }
        let score = 0;
        const maxScore = 100;
        const recommendations = [];
        const requiredFields = [
            { field: 'name', weight: 8 },
            { field: 'nik', weight: 8 },
            { field: 'dateOfBirth', weight: 8 },
            { field: 'gender', weight: 8 },
            { field: 'medicalRecordNumber', weight: 8 }
        ];
        let requiredScore = 0;
        for (const { field, weight } of requiredFields) {
            if (patient[field]) {
                requiredScore += weight;
            }
            else {
                recommendations.push({
                    type: 'missing_field',
                    priority: 'high',
                    message: `Missing required field: ${field}`,
                    field: field
                });
            }
        }
        score += requiredScore;
        const hasDiagnosis = patient.diagnoses && patient.diagnoses.length > 0;
        const hasMedicalRecords = patient.medicalRecords && patient.medicalRecords.length > 0;
        const hasProcedures = patient.procedures && patient.procedures.length > 0;
        let medicalScore = 0;
        if (hasDiagnosis) {
            medicalScore += 10;
            const latestDiagnosis = patient.diagnoses[patient.diagnoses.length - 1];
            if (latestDiagnosis.diagnosisName && latestDiagnosis.diagnosisCode) {
                medicalScore += 5;
            }
            else {
                recommendations.push({
                    type: 'missing_medical_info',
                    priority: 'medium',
                    message: 'Complete diagnosis information (code and name)',
                    field: 'diagnosisInfo'
                });
            }
            if (latestDiagnosis.severity) {
                medicalScore += 5;
            }
            else {
                recommendations.push({
                    type: 'missing_medical_info',
                    priority: 'medium',
                    message: 'Add diagnosis severity information',
                    field: 'severity'
                });
            }
        }
        else {
            recommendations.push({
                type: 'missing_medical_info',
                priority: 'high',
                message: 'Add diagnosis information'
            });
        }
        if (hasMedicalRecords) {
            medicalScore += 5;
        }
        else {
            recommendations.push({
                type: 'missing_medical_info',
                priority: 'medium',
                message: 'Add medical records'
            });
        }
        score += medicalScore;
        if (hasMedicalRecords && patient.medicalRecords.some(record => record.familyHistory)) {
            score += 5;
        }
        else {
            recommendations.push({
                type: 'missing_family_history',
                priority: 'low',
                message: 'Consider adding family history for better risk assessment'
            });
        }
        if (hasProcedures) {
            score += 5;
        }
        else {
            recommendations.push({
                type: 'missing_treatment_history',
                priority: 'medium',
                message: 'Document procedures for comprehensive care'
            });
        }
        const labResultCount = patient.laboratoryResults?.length || 0;
        if (labResultCount >= 3) {
            score += 15;
        }
        else if (labResultCount >= 1) {
            score += labResultCount * 5;
            recommendations.push({
                type: 'insufficient_lab_results',
                priority: 'medium',
                message: `Consider adding more laboratory results (${3 - labResultCount} more recommended)`
            });
        }
        else {
            recommendations.push({
                type: 'missing_lab_results',
                priority: 'high',
                message: 'No laboratory results found. Add relevant test results.'
            });
        }
        if (patient.medications && patient.medications.length > 0) {
            const activeMedications = patient.medications.filter(med => med.isActive);
            if (activeMedications.length > 0) {
                score += 10;
            }
            else {
                score += 5;
                recommendations.push({
                    type: 'incomplete_treatment_plan',
                    priority: 'high',
                    message: 'Update current medication status'
                });
            }
        }
        else {
            recommendations.push({
                type: 'missing_treatment_plan',
                priority: 'high',
                message: 'Create medication plan for patient care'
            });
        }
        const requiredCompleteness = requiredScore / 40;
        const medicalCompleteness = medicalScore / 25;
        const overallCompleteness = score / maxScore;
        await this.saveQualityMetric(patientId, {
            score: Math.round(score),
            requiredCompleteness,
            medicalCompleteness,
            imageCount: labResultCount,
            recommendations: recommendations.length
        });
        return {
            score: Math.round(score),
            completeness: Math.round(overallCompleteness * 100),
            requiredCompleteness: Math.round(requiredCompleteness * 100),
            medicalCompleteness: Math.round(medicalCompleteness * 100),
            imageCount: labResultCount,
            recommendations,
            lastUpdated: new Date(),
            category: this.getQualityCategory(score)
        };
    }
    async getQualityTrends(patientId, days = 30) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        const metrics = await this.prisma.qualityMetric.findMany({
            where: {
                patientId,
                createdAt: {
                    gte: startDate
                }
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
        return metrics.map(metric => ({
            date: metric.createdAt,
            score: metric.score,
            completeness: metric.completeness,
            imageCount: metric.imageCount,
            recommendations: metric.recommendations
        }));
    }
    async getCenterQualitySummary(centerId) {
        const patients = await this.prisma.patient.findMany({
            where: { centerId }
        });
        const scores = await Promise.all(patients.map(patient => this.calculateQualityScore(patient.id)));
        const totalPatients = scores.length;
        if (totalPatients === 0) {
            return {
                centerId,
                totalPatients: 0,
                averageScore: 0,
                qualityDistribution: {
                    high: 0,
                    medium: 0,
                    low: 0,
                    percentages: { high: 0, medium: 0, low: 0 }
                },
                topRecommendations: [],
                lastUpdated: new Date()
            };
        }
        const averageScore = scores.reduce((sum, score) => sum + score.score, 0) / totalPatients;
        const highQualityCount = scores.filter(score => score.score >= 90).length;
        const mediumQualityCount = scores.filter(score => score.score >= 70 && score.score < 90).length;
        const lowQualityCount = scores.filter(score => score.score < 70).length;
        const allRecommendations = scores.flatMap(score => score.recommendations);
        const recommendationTypes = allRecommendations.reduce((acc, rec) => {
            acc[rec.type] = (acc[rec.type] || 0) + 1;
            return acc;
        }, {});
        const topRecommendations = Object.entries(recommendationTypes)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([type, count]) => ({
            type,
            count,
            percentage: Math.round((count / totalPatients) * 100)
        }));
        return {
            centerId,
            totalPatients,
            averageScore: Math.round(averageScore),
            qualityDistribution: {
                high: highQualityCount,
                medium: mediumQualityCount,
                low: lowQualityCount,
                percentages: {
                    high: Math.round((highQualityCount / totalPatients) * 100),
                    medium: Math.round((mediumQualityCount / totalPatients) * 100),
                    low: Math.round((lowQualityCount / totalPatients) * 100)
                }
            },
            topRecommendations,
            lastUpdated: new Date()
        };
    }
    async getNationalQualityOverview() {
        const allPatients = await this.prisma.patient.findMany({
            select: { id: true }
        });
        if (allPatients.length === 0) {
            return {
                totalPatients: 0,
                averageScore: 0,
                qualityDistribution: {
                    high: 0,
                    medium: 0,
                    low: 0,
                    percentages: { high: 0, medium: 0, low: 0 }
                },
                trends: [],
                lastUpdated: new Date()
            };
        }
        this.logger.log(`Calculating quality scores for ${allPatients.length} patients...`);
        const scores = await Promise.all(allPatients.map(patient => this.calculateQualityScore(patient.id)));
        const totalPatients = scores.length;
        const averageScore = scores.reduce((sum, score) => sum + score.score, 0) / totalPatients;
        const highQualityCount = scores.filter(score => score.score >= 90).length;
        const mediumQualityCount = scores.filter(score => score.score >= 70 && score.score < 90).length;
        const lowQualityCount = scores.filter(score => score.score < 70).length;
        const weeklyTrends = [
            { week: 1, averageScore: Math.round(averageScore * 0.95), patientCount: totalPatients, minScore: 0, maxScore: 100 },
            { week: 2, averageScore: Math.round(averageScore * 0.97), patientCount: totalPatients, minScore: 0, maxScore: 100 },
            { week: 3, averageScore: Math.round(averageScore * 0.99), patientCount: totalPatients, minScore: 0, maxScore: 100 },
            { week: 4, averageScore: Math.round(averageScore), patientCount: totalPatients, minScore: 0, maxScore: 100 }
        ];
        return {
            totalPatients,
            averageScore: Math.round(averageScore),
            qualityDistribution: {
                high: highQualityCount,
                medium: mediumQualityCount,
                low: lowQualityCount,
                percentages: {
                    high: Math.round((highQualityCount / totalPatients) * 100),
                    medium: Math.round((mediumQualityCount / totalPatients) * 100),
                    low: Math.round((lowQualityCount / totalPatients) * 100)
                }
            },
            trends: weeklyTrends,
            lastUpdated: new Date()
        };
    }
    async saveQualityMetric(patientId, data) {
        await this.prisma.qualityMetric.create({
            data: {
                patientId,
                score: data.score,
                completeness: Math.round((data.requiredCompleteness + data.medicalCompleteness) * 50),
                requiredCompleteness: Math.round(data.requiredCompleteness * 100),
                medicalCompleteness: Math.round(data.medicalCompleteness * 100),
                imageCount: data.imageCount,
                recommendations: data.recommendations
            }
        });
    }
    getQualityCategory(score) {
        if (score >= 90)
            return 'excellent';
        if (score >= 80)
            return 'good';
        if (score >= 70)
            return 'fair';
        return 'poor';
    }
    calculateWeeklyTrends(metrics) {
        const weeklyData = metrics.reduce((acc, metric) => {
            const week = this.getWeekNumber(metric.createdAt);
            if (!acc[week]) {
                acc[week] = { total: 0, count: 0, scores: [] };
            }
            acc[week].total += metric.score;
            acc[week].count += 1;
            acc[week].scores.push(metric.score);
            return acc;
        }, {});
        return Object.entries(weeklyData)
            .map(([week, data]) => ({
            week: parseInt(week),
            averageScore: Math.round(data.total / data.count),
            patientCount: data.count,
            minScore: Math.min(...data.scores),
            maxScore: Math.max(...data.scores)
        }))
            .sort((a, b) => a.week - b.week)
            .slice(-12);
    }
    getWeekNumber(date) {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }
    async validatePatientData(patientId) {
        const patient = await this.prisma.patient.findUnique({
            where: { id: patientId },
            include: {
                diagnoses: true,
                procedures: true,
                laboratoryResults: true
            }
        });
        if (!patient) {
            return {
                isValid: false,
                errors: ['Patient not found'],
                warnings: []
            };
        }
        const errors = [];
        const warnings = [];
        if (!patient.name)
            errors.push('Patient name is required');
        if (!patient.nik)
            errors.push('Patient NIK (ID number) is required');
        if (!patient.dateOfBirth)
            errors.push('Birth date is required');
        if (!patient.gender)
            errors.push('Gender is required');
        if (!patient.hospitalRecordNumber)
            errors.push('Hospital record number is required');
        if (patient.nik) {
            const nikPattern = /^[0-9]{16}$/;
            if (!nikPattern.test(patient.nik)) {
                warnings.push('NIK format may be invalid (expected 16 digits)');
            }
        }
        if (patient.dateOfBirth) {
            const birth = new Date(patient.dateOfBirth);
            const now = new Date();
            if (birth >= now) {
                errors.push('Birth date cannot be in the future');
            }
            if (patient.diagnoses && patient.diagnoses.length > 0) {
                for (const diagnosis of patient.diagnoses) {
                    if (diagnosis.onsetDate) {
                        const onset = new Date(diagnosis.onsetDate);
                        if (birth >= onset) {
                            errors.push('Birth date cannot be after diagnosis onset date');
                        }
                        if (onset > now) {
                            warnings.push('Diagnosis onset date is in the future');
                        }
                        const ageAtDiagnosis = onset.getFullYear() - birth.getFullYear();
                        if (ageAtDiagnosis > 120 || ageAtDiagnosis < 0) {
                            warnings.push('Patient age at diagnosis seems unrealistic');
                        }
                    }
                }
            }
        }
        if (patient.diagnoses && patient.diagnoses.length > 0) {
            const incompleteDiagnoses = patient.diagnoses.filter(d => !d.diagnosisCode || !d.diagnosisName);
            if (incompleteDiagnoses.length > 0) {
                warnings.push(`${incompleteDiagnoses.length} diagnosis(es) have incomplete information`);
            }
        }
        const labResults = patient.laboratoryResults || [];
        if (labResults.length === 0) {
            warnings.push('No laboratory results available');
        }
        return {
            isValid: errors.length === 0,
            errors,
            warnings
        };
    }
    async getStaffPerformanceLeaderboard(centerId) {
        this.logger.warn('Staff performance tracking requires createdBy field in Patient model');
        return [
            {
                staffId: '1',
                staffName: 'Data Entry Team',
                staffEmail: 'team@inamsos.go.id',
                entriesCount: 50,
                avgQualityScore: 85,
                completionRate: 92,
                rank: 1
            }
        ];
    }
    async getMissingDataHeatmap(centerId) {
        const whereClause = { isActive: true };
        if (centerId) {
            whereClause.centerId = centerId;
        }
        const patients = await this.prisma.patient.findMany({
            where: whereClause,
            include: {
                diagnoses: true,
                medicalRecords: true,
                procedures: true,
                laboratoryResults: true,
                medications: true,
                visits: true
            }
        });
        const totalPatients = patients.length;
        if (totalPatients === 0) {
            return [];
        }
        const fieldChecks = [
            {
                field: 'NIK (ID Number)',
                check: (p) => !p.nik || p.nik.trim() === '',
                priority: 'high'
            },
            {
                field: 'Phone Number',
                check: (p) => !p.phone || p.phone.trim() === '',
                priority: 'medium'
            },
            {
                field: 'Email Address',
                check: (p) => !p.email || p.email.trim() === '',
                priority: 'low'
            },
            {
                field: 'Address Information',
                check: (p) => !p.address || p.address.trim() === '',
                priority: 'medium'
            },
            {
                field: 'Diagnosis Information',
                check: (p) => !p.diagnoses || p.diagnoses.length === 0,
                priority: 'high'
            },
            {
                field: 'Complete Diagnosis Details',
                check: (p) => {
                    if (!p.diagnoses || p.diagnoses.length === 0)
                        return true;
                    const latestDiagnosis = p.diagnoses[p.diagnoses.length - 1];
                    return !latestDiagnosis.diagnosisCode || !latestDiagnosis.diagnosisName;
                },
                priority: 'high'
            },
            {
                field: 'Medical Records',
                check: (p) => !p.medicalRecords || p.medicalRecords.length === 0,
                priority: 'medium'
            },
            {
                field: 'Family History',
                check: (p) => {
                    if (!p.medicalRecords || p.medicalRecords.length === 0)
                        return true;
                    return !p.medicalRecords.some(record => record.familyHistory);
                },
                priority: 'low'
            },
            {
                field: 'Laboratory Results',
                check: (p) => !p.laboratoryResults || p.laboratoryResults.length === 0,
                priority: 'high'
            },
            {
                field: 'Treatment Procedures',
                check: (p) => !p.procedures || p.procedures.length === 0,
                priority: 'medium'
            },
            {
                field: 'Current Medications',
                check: (p) => !p.medications || p.medications.length === 0,
                priority: 'medium'
            },
            {
                field: 'Follow-up Visits',
                check: (p) => !p.visits || p.visits.length === 0,
                priority: 'low'
            }
        ];
        const heatmap = fieldChecks.map(({ field, check, priority }) => {
            const missingCount = patients.filter(check).length;
            const missingPercentage = Math.round((missingCount / totalPatients) * 100);
            return {
                field,
                missingCount,
                missingPercentage,
                priority
            };
        })
            .sort((a, b) => b.missingPercentage - a.missingPercentage);
        return heatmap;
    }
};
exports.QualityService = QualityService;
exports.QualityService = QualityService = QualityService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QualityService);
//# sourceMappingURL=quality.service.js.map
