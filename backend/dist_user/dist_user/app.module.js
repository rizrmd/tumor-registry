"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const common_2 = require("@nestjs/common");
const database_module_1 = require("./database/database.module");
const common_module_1 = require("./common/common.module");
const health_module_1 = require("./common/health/health.module");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const centers_module_1 = require("./modules/centers/centers.module");
const patients_module_1 = require("./modules/patients/patients.module");
const research_module_1 = require("./modules/research/research.module");
const research_requests_module_1 = require("./modules/research-requests/research-requests.module");
const medical_imaging_module_1 = require("./modules/medical-imaging/medical-imaging.module");
const peer_review_module_1 = require("./modules/peer-review/peer-review.module");
const offline_queue_module_1 = require("./modules/offline-queue/offline-queue.module");
const musculoskeletal_module_1 = require("./modules/musculoskeletal/musculoskeletal.module");
const regions_module_1 = require("./modules/regions/regions.module");
const clinical_photos_module_1 = require("./modules/clinical-photos/clinical-photos.module");
const quality_module_1 = require("./modules/quality/quality.module");
const system_administration_module_1 = require("./modules/system-administration/system-administration.module");
const medical_record_module_1 = require("./modules/medical-record/medical-record.module");
const national_dashboard_module_1 = require("./modules/national-dashboard/national-dashboard.module");
const activity_log_module_1 = require("./modules/activity-log/activity-log.module");
const logging_interceptor_1 = require("./modules/activity-log/logging.interceptor");
const mutation_interceptor_1 = require("./modules/offline-queue/mutation.interceptor");
const app_controller_1 = require("./app.controller");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
let AppModule = class AppModule {
    configure(consumer) {
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            database_module_1.DatabaseModule,
            common_module_1.CommonModule,
            health_module_1.HealthModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            centers_module_1.CentersModule,
            regions_module_1.RegionsModule,
            patients_module_1.PatientsModule,
            research_module_1.ResearchModule,
            research_requests_module_1.ResearchRequestsModule,
            medical_imaging_module_1.MedicalImagingModule,
            peer_review_module_1.PeerReviewModule,
            offline_queue_module_1.OfflineQueueModule,
            musculoskeletal_module_1.MusculoskeletalModule,
            clinical_photos_module_1.ClinicalPhotosModule,
            quality_module_1.QualityModule,
            system_administration_module_1.SystemAdministrationModule,
            medical_record_module_1.MedicalRecordModule,
            national_dashboard_module_1.NationalDashboardModule,
            activity_log_module_1.ActivityLogModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: mutation_interceptor_1.MutationInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logging_interceptor_1.LoggingInterceptor,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.ValidationExceptionFilter,
            },
            {
                provide: core_1.APP_PIPE,
                useValue: new common_2.ValidationPipe({
                    whitelist: true,
                    forbidNonWhitelisted: true,
                    transform: true,
                    transformOptions: {
                        enableImplicitConversion: true,
                    },
                }),
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
