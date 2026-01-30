# Rencana Perubahan Fundamental - INAMSOS Registry
**Tanggal:** 28 Desember 2025
**Status:** Draft untuk Review
**Versi:** 1.0

---

## 📋 Executive Summary

Dokumen ini merancang perubahan fundamental pada sistem INAMSOS Registry untuk meningkatkan privasi pasien, keamanan data, dan compliance terhadap regulasi penelitian. Perubahan mencakup anonimisasi data pasien, sistem medical record baru, dashboard nasional, redesign approval flow, activity logging, dan automated password reset.

### Prioritas Implementasi
1. 🔴 **Critical** - Anonimisasi nama pasien & MR Generator (Requirement 1-2)
2. 🟡 **High** - Sistem request & approval baru (Requirement 3-4)
3. 🟢 **Medium** - Activity logs & Password timer (Requirement 5-6)

---

## 1️⃣ Anonimisasi Data Pasien

### 🎯 Tujuan
Menghapus nama pasien dari sistem untuk menjaga privasi dan compliance dengan regulasi penelitian, namun tetap memungkinkan identifikasi melalui medical record INAMSOS.

### 📊 Perubahan Database

#### **Tabel: patients**
```sql
-- Field yang DIHAPUS:
- name (VARCHAR) ❌

-- Field yang DITAMBAH:
+ anonymousId (VARCHAR, UNIQUE, INDEXED) ✅
  Format: "P-{centerId}-{sequential}"
  Contoh: "P-SBY-00001", "P-JKT-00142"

-- Field yang DIMODIFIKASI:
~ identityNumber (VARCHAR, NULLABLE → ENCRYPTED) 🔐
  Stored encrypted, only viewable by NATIONAL_ADMIN
~ emergencyContact.name (ENCRYPTED) 🔐
```

#### **Migration Strategy untuk Data Existing**
```javascript
// 1. Backup database terlebih dahulu
// 2. Generate anonymousId untuk semua pasien existing
// 3. Encrypt identityNumber yang ada
// 4. Archive nama pasien ke tabel terpisah (patients_archived_pii)
// 5. Drop column 'name' setelah verifikasi

// Tabel archive untuk recovery (hanya accessible oleh superadmin)
CREATE TABLE patients_archived_pii (
  id UUID PRIMARY KEY,
  patientId UUID REFERENCES patients(id),
  name VARCHAR ENCRYPTED,
  archivedAt TIMESTAMP,
  archivedBy UUID REFERENCES users(id)
);
```

### 🔧 Perubahan API

#### **Endpoints yang Perlu Diubah:**

**Backend:**
```typescript
// backend/src/patients/dto/patient.dto.ts
export interface CreatePatientDto {
  // HAPUS
  - name: string; ❌

  // TAMBAH
  + anonymousId?: string; // Auto-generated jika kosong

  // MODIFY (opsional untuk medical staff, encrypted)
  ~ identityNumber?: string; // Will be encrypted
}

// backend/src/patients/interfaces/patient.interface.ts
export interface Patient {
  - name: string; ❌
  + anonymousId: string; ✅
  ~ identityNumber?: string; // Encrypted, only for authorized roles
}
```

**Frontend:**
```typescript
// frontend/src/types/patient.ts
export interface Patient {
  - name: string; ❌
  + anonymousId: string; ✅
}

// Semua form input hapus field 'name'
// Semua tampilan ganti dari patient.name → patient.anonymousId
```

### 🖥️ Perubahan UI

#### **File yang Perlu Diupdate:**
1. `frontend/src/app/patients/new/page.tsx` - Remove name input field
2. `frontend/src/components/patients/PatientList.tsx` - Display anonymousId instead of name
3. `frontend/src/components/patients/PatientDetail.tsx` - Remove name display
4. `frontend/src/components/patients/wizard/*` - Remove name from all wizard steps
5. `frontend/src/components/patients/PatientSearch.tsx` - Search by anonymousId/MR only

#### **UI Guidelines:**
```
Sebelum:
┌─────────────────────────────────────┐
│ Nama Pasien: John Doe               │
│ No. RM: 12345                       │
└─────────────────────────────────────┘

Sesudah:
┌─────────────────────────────────────┐
│ ID Anonim: P-SBY-00123              │
│ No. RM INAMSOS: SBY-2025-00123      │
│ No. RM Rumah Sakit: 12345 (opsional)│
└─────────────────────────────────────┘
```

### ⚠️ Impact Analysis
- **HIGH**: Semua modul yang menampilkan data pasien perlu update
- **Files Affected**: ~30 files (frontend + backend)
- **Migration Required**: YES - Data existing perlu dimigrasikan
- **Rollback Plan**: Archive table `patients_archived_pii` dapat di-restore jika diperlukan

---

## 2️⃣ Medical Record Number Generator (INAMSOS)

### 🎯 Tujuan
Memberikan setiap pasien medical record number yang unik dan terstandarisasi dengan format berbasis center, terpisah dari MR rumah sakit.

### 📐 Format Medical Record INAMSOS

```
Format: {CENTER_CODE}-{YEAR}-{SEQUENTIAL}

Contoh:
- SBY-2025-00001  (Surabaya, tahun 2025, patient ke-1)
- JKT-2025-00142  (Jakarta, tahun 2025, patient ke-142)
- BDG-2025-00023  (Bandung, tahun 2025, patient ke-23)

Rules:
- CENTER_CODE: 3 huruf kapital (customizable per center)
- YEAR: 4 digit tahun
- SEQUENTIAL: 5 digit dengan leading zeros, reset setiap tahun
```

### 📊 Perubahan Database

#### **Tabel: centers**
```sql
-- Field BARU:
+ mrPrefix VARCHAR(3) UNIQUE NOT NULL
  Contoh: 'SBY', 'JKT', 'BDG'

+ mrSequenceCounter INT DEFAULT 0
  Counter untuk sequential number (per tahun)

+ mrSequenceYear INT DEFAULT 2025
  Tahun terakhir reset counter
```

#### **Tabel: patients**
```sql
-- Field BARU:
+ inamsosRecordNumber VARCHAR(20) UNIQUE INDEXED
  Format: {CENTER_CODE}-{YEAR}-{SEQUENTIAL}
  Contoh: "SBY-2025-00001"

-- Field EXISTING (rename untuk clarity):
~ medicalRecordNumber → hospitalRecordNumber
  Nomer RM dari rumah sakit (opsional, bisa di-input manual)
```

#### **Tabel BARU: medical_record_sequences**
```sql
CREATE TABLE medical_record_sequences (
  id UUID PRIMARY KEY,
  centerId UUID REFERENCES centers(id),
  year INT NOT NULL,
  lastSequence INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),
  UNIQUE(centerId, year)
);

-- Index untuk performa
CREATE INDEX idx_mr_seq_center_year ON medical_record_sequences(centerId, year);
```

### 🔧 Service Logic

**Backend: medical-record.service.ts (NEW)**
```typescript
@Injectable()
export class MedicalRecordService {
  constructor(private prisma: PrismaService) {}

  /**
   * Generate INAMSOS Medical Record Number
   * Thread-safe dengan database transaction
   */
  async generateInamsosNumber(centerId: string): Promise<string> {
    const center = await this.prisma.center.findUnique({
      where: { id: centerId },
      select: { mrPrefix: true }
    });

    if (!center || !center.mrPrefix) {
      throw new Error('Center MR prefix not configured');
    }

    const year = new Date().getFullYear();

    // Atomic increment dengan transaction
    const sequence = await this.prisma.$transaction(async (tx) => {
      let seqRecord = await tx.medicalRecordSequence.findUnique({
        where: {
          centerId_year: { centerId, year }
        }
      });

      if (!seqRecord) {
        // First patient this year for this center
        seqRecord = await tx.medicalRecordSequence.create({
          data: { centerId, year, lastSequence: 1 }
        });
        return 1;
      } else {
        // Increment sequence
        const updated = await tx.medicalRecordSequence.update({
          where: { id: seqRecord.id },
          data: { lastSequence: { increment: 1 } }
        });
        return updated.lastSequence;
      }
    });

    // Format: SBY-2025-00001
    const mrNumber = `${center.mrPrefix}-${year}-${String(sequence).padStart(5, '0')}`;

    return mrNumber;
  }

  /**
   * Validate MR number format
   */
  validateFormat(mrNumber: string): boolean {
    const regex = /^[A-Z]{3}-\d{4}-\d{5}$/;
    return regex.test(mrNumber);
  }

  /**
   * Parse MR number
   */
  parseNumber(mrNumber: string) {
    const [prefix, year, sequence] = mrNumber.split('-');
    return {
      centerPrefix: prefix,
      year: parseInt(year),
      sequence: parseInt(sequence)
    };
  }
}
```

### 🔧 Perubahan Patient Service

**Backend: patients.service.ts**
```typescript
@Injectable()
export class PatientsService {
  constructor(
    private prisma: PrismaService,
    private medicalRecordService: MedicalRecordService, // INJECT
  ) {}

  async create(dto: CreatePatientDto, userId: string) {
    // Auto-generate INAMSOS MR Number
    const inamsosRecordNumber = await this.medicalRecordService.generateInamsosNumber(
      dto.treatmentCenter
    );

    const patient = await this.prisma.patient.create({
      data: {
        ...dto,
        inamsosRecordNumber, // NEW
        hospitalRecordNumber: dto.medicalRecordNumber, // RENAME
        anonymousId: `P-${dto.treatmentCenter}-${inamsosRecordNumber.split('-')[2]}`,
        createdBy: userId,
      }
    });

    return patient;
  }
}
```

### 🖥️ Perubahan UI

#### **Center Management (Admin)**
```typescript
// frontend/src/app/admin/centers/page.tsx

// Tambahkan field untuk konfigurasi MR Prefix
<FormField>
  <label>Medical Record Prefix (3 huruf)</label>
  <input
    maxLength={3}
    pattern="[A-Z]{3}"
    placeholder="SBY"
    required
  />
  <small>Contoh: SBY untuk Surabaya, JKT untuk Jakarta</small>
</FormField>

// Tampilkan preview format
<div className="preview">
  Preview Format: <strong>{prefix}-2025-00001</strong>
</div>
```

#### **Patient Entry Form**
```typescript
// frontend/src/app/patients/new/page.tsx

// HAPUS input manual MR INAMSOS (auto-generated)
// UBAH label MR existing
<FormField>
  <label>No. Rekam Medis Rumah Sakit (Opsional)</label>
  <input
    name="hospitalRecordNumber"
    placeholder="Contoh: 12345"
  />
  <small>Isi jika pasien sudah punya nomor RM dari rumah sakit</small>
</FormField>

// TAMPILKAN info setelah submit
<Alert type="success">
  Pasien berhasil didaftarkan!
  No. RM INAMSOS: <strong>{inamsosRecordNumber}</strong>
  ID Anonim: <strong>{anonymousId}</strong>
</Alert>
```

### 🔄 Migration Plan

```sql
-- Step 1: Add new columns to centers
ALTER TABLE centers ADD COLUMN mrPrefix VARCHAR(3);
ALTER TABLE centers ADD COLUMN mrSequenceCounter INT DEFAULT 0;
ALTER TABLE centers ADD COLUMN mrSequenceYear INT DEFAULT 2025;

-- Step 2: Set default prefixes (need to be configured manually)
UPDATE centers SET mrPrefix = 'SBY' WHERE name LIKE '%Surabaya%';
UPDATE centers SET mrPrefix = 'JKT' WHERE name LIKE '%Jakarta%';
-- ... (admin harus set manual untuk center lain)

-- Step 3: Create sequences table
CREATE TABLE medical_record_sequences (...);

-- Step 4: Add new column to patients
ALTER TABLE patients ADD COLUMN inamsosRecordNumber VARCHAR(20) UNIQUE;
ALTER TABLE patients RENAME COLUMN medicalRecordNumber TO hospitalRecordNumber;

-- Step 5: Generate INAMSOS numbers for existing patients
-- (Run migration script to generate retroactive)
```

### ⚠️ Impact Analysis
- **MEDIUM**: Mostly backend changes, minimal UI impact
- **Files Affected**: ~15 files
- **Migration Required**: YES - Existing patients need retroactive MR numbers
- **Testing Required**: Transaction safety, sequence uniqueness

---

## 3️⃣ Dashboard Nasional - Data Agregat Public

### 🎯 Tujuan
Semua center dapat melihat statistik nasional agregat tanpa identitas pasien. Data detail hanya melalui request approval.

### 📊 Perubahan Database

#### **Tabel BARU: national_statistics_cache**
```sql
CREATE TABLE national_statistics_cache (
  id UUID PRIMARY KEY,
  statisticType VARCHAR(50), -- 'daily', 'weekly', 'monthly', 'yearly'
  periodStart DATE,
  periodEnd DATE,

  -- Aggregate Data (JSON)
  totalPatients INT,
  totalCenters INT,
  byGender JSONB,
  byAgeGroup JSONB,
  byCancerStage JSONB,
  byTreatmentStatus JSONB,
  byPrimarySite JSONB,
  byProvince JSONB,
  byCenter JSONB, -- Center ID dengan count (tanpa detail pasien)

  -- Metadata
  generatedAt TIMESTAMP,
  expiresAt TIMESTAMP,
  lastUpdatedAt TIMESTAMP DEFAULT NOW(),

  INDEX idx_stats_type_period(statisticType, periodStart, periodEnd)
);
```

#### **View: national_aggregated_patients**
```sql
-- Read-only view untuk query agregat cepat
CREATE VIEW national_aggregated_patients AS
SELECT
  centerId,
  treatmentCenter,
  COUNT(*) as totalPatients,
  COUNT(CASE WHEN gender = 'male' THEN 1 END) as maleCount,
  COUNT(CASE WHEN gender = 'female' THEN 1 END) as femaleCount,
  COUNT(CASE WHEN cancerStage = 'I' THEN 1 END) as stageI,
  COUNT(CASE WHEN cancerStage = 'II' THEN 1 END) as stageII,
  COUNT(CASE WHEN cancerStage = 'III' THEN 1 END) as stageIII,
  COUNT(CASE WHEN cancerStage = 'IV' THEN 1 END) as stageIV,
  -- ... (lebih banyak aggregations)
FROM patients
WHERE isActive = true
GROUP BY centerId, treatmentCenter;
```

### 🔧 API Baru

**Backend: national-dashboard.controller.ts (NEW)**
```typescript
@Controller('api/national-dashboard')
export class NationalDashboardController {

  /**
   * GET /api/national-dashboard/statistics
   * Public untuk semua authenticated users
   */
  @Get('statistics')
  @UseGuards(AuthGuard)
  async getNationalStatistics(
    @Query('period') period: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly',
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    // Return cached statistics (updated hourly via cron job)
    return this.dashboardService.getCachedStatistics(period, startDate, endDate);
  }

  /**
   * GET /api/national-dashboard/trends
   * Trend analysis over time
   */
  @Get('trends')
  @UseGuards(AuthGuard)
  async getTrends(
    @Query('metric') metric: string, // 'registrations', 'mortality', etc
    @Query('groupBy') groupBy: 'month' | 'quarter' | 'year',
  ) {
    return this.dashboardService.getTrends(metric, groupBy);
  }

  /**
   * GET /api/national-dashboard/centers-summary
   * Summary per center (count only, no patient details)
   */
  @Get('centers-summary')
  @UseGuards(AuthGuard)
  async getCentersSummary() {
    return this.dashboardService.getCentersSummary();
  }

  /**
   * POST /api/national-dashboard/search-aggregated
   * Filter aggregate data (NO patient details)
   */
  @Post('search-aggregated')
  @UseGuards(AuthGuard)
  async searchAggregatedData(
    @Body() filters: AggregateSearchDto
  ) {
    // Filters: province, cancerStage, ageRange, etc
    // Returns: COUNT and STATISTICS only, NO patient identifiers
    return this.dashboardService.searchAggregatedData(filters);
  }
}
```

**Service: national-dashboard.service.ts (NEW)**
```typescript
@Injectable()
export class NationalDashboardService {

  /**
   * Get cached national statistics
   * Cache diupdate setiap 1 jam via cron job
   */
  async getCachedStatistics(period: string, startDate?: string, endDate?: string) {
    const cached = await this.prisma.nationalStatisticsCache.findFirst({
      where: {
        statisticType: period,
        periodStart: startDate ? new Date(startDate) : undefined,
        periodEnd: endDate ? new Date(endDate) : undefined,
        expiresAt: { gt: new Date() }
      },
      orderBy: { generatedAt: 'desc' }
    });

    if (cached) {
      return cached;
    }

    // Generate fresh statistics
    return this.generateStatistics(period, startDate, endDate);
  }

  /**
   * Generate statistics (aggregasi real-time)
   */
  async generateStatistics(period: string, startDate?: string, endDate?: string) {
    const stats = await this.prisma.patient.aggregate({
      where: {
        isActive: true,
        createdAt: {
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined,
        }
      },
      _count: { id: true },
      // ... more aggregations
    });

    // Group by different dimensions
    const byGender = await this.prisma.patient.groupBy({
      by: ['gender'],
      where: { isActive: true },
      _count: { id: true }
    });

    // ... more groupings

    // Cache hasil
    const cached = await this.prisma.nationalStatisticsCache.create({
      data: {
        statisticType: period,
        totalPatients: stats._count.id,
        byGender: byGender,
        // ... more data
        generatedAt: new Date(),
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      }
    });

    return cached;
  }

  /**
   * Search aggregated data (NO identifiable info)
   */
  async searchAggregatedData(filters: AggregateSearchDto) {
    const where: any = { isActive: true };

    if (filters.province) where.address = { province: filters.province };
    if (filters.cancerStage) where.cancerStage = filters.cancerStage;
    if (filters.ageMin || filters.ageMax) {
      // Calculate date range from age
      const today = new Date();
      if (filters.ageMin) {
        const maxDob = new Date(today.getFullYear() - filters.ageMin, 0, 1);
        where.dateOfBirth = { ...where.dateOfBirth, lte: maxDob };
      }
      if (filters.ageMax) {
        const minDob = new Date(today.getFullYear() - filters.ageMax - 1, 0, 1);
        where.dateOfBirth = { ...where.dateOfBirth, gte: minDob };
      }
    }

    // Return aggregate ONLY - NO patient details
    const results = await this.prisma.patient.aggregate({
      where,
      _count: { id: true },
    });

    const grouped = await this.prisma.patient.groupBy({
      by: ['cancerStage', 'gender', 'treatmentStatus'],
      where,
      _count: { id: true }
    });

    return {
      totalMatches: results._count.id,
      breakdown: grouped,
      filters: filters,
      notice: 'Aggregate data only. Request detailed access through Research Request system.'
    };
  }
}
```

### 🖥️ Frontend - National Dashboard

**NEW PAGE: frontend/src/app/research/national-dashboard/page.tsx**
```typescript
'use client';

export default function NationalDashboardPage() {
  const [stats, setStats] = useState<NationalStatistics | null>(null);
  const [filters, setFilters] = useState<AggregateFilters>({});

  // Load national statistics
  useEffect(() => {
    loadStatistics();
  }, []);

  // Search with filters
  const handleSearch = async () => {
    const results = await fetch('/api/national-dashboard/search-aggregated', {
      method: 'POST',
      body: JSON.stringify(filters)
    });
    setStats(await results.json());
  };

  return (
    <Layout>
      <h1>Dashboard Nasional INAMSOS</h1>

      {/* Notice Banner */}
      <Alert type="info">
        📊 Dashboard ini menampilkan data agregat nasional.
        Untuk mengakses data detail pasien, silakan ajukan
        <Link href="/research/requests/new">Permintaan Penelitian</Link>.
      </Alert>

      {/* Filter Panel */}
      <div className="filters">
        <select onChange={(e) => setFilters({...filters, province: e.target.value})}>
          <option value="">Semua Provinsi</option>
          <option value="Jawa Timur">Jawa Timur</option>
          {/* ... */}
        </select>

        <select onChange={(e) => setFilters({...filters, cancerStage: e.target.value})}>
          <option value="">Semua Stadium</option>
          <option value="I">Stadium I</option>
          {/* ... */}
        </select>

        <button onClick={handleSearch}>Cari</button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Pasien" value={stats?.totalPatients} />
        <StatCard title="Total Center" value={stats?.totalCenters} />
        <StatCard title="Pasien Aktif" value={stats?.activePatients} />
        <StatCard title="Kasus Baru (Bulan Ini)" value={stats?.newCases} />
      </div>

      {/* Charts */}
      <div className="charts">
        <PieChart data={stats?.byGender} title="Distribusi Gender" />
        <BarChart data={stats?.byProvince} title="Pasien per Provinsi" />
        <LineChart data={stats?.trends} title="Trend Registrasi" />
      </div>

      {/* Call to Action */}
      <div className="cta">
        <h3>Butuh data detail untuk penelitian?</h3>
        <p>Ajukan permintaan akses data melalui sistem Research Request</p>
        <button onClick={() => router.push('/research/requests/new')}>
          Ajukan Permintaan
        </button>
      </div>
    </Layout>
  );
}
```

### ⚠️ Impact Analysis
- **LOW-MEDIUM**: New feature, tidak mengubah existing functionality
- **Files Affected**: ~10 new files
- **Migration Required**: NO (new tables only)
- **Performance**: Caching mengurangi load database

---

## 4️⃣ Sistem Request & Approval Baru

### 🎯 Tujuan
Mengubah approval flow: CENTER request → NATIONAL_ADMIN approve (bukan center lain yang approve).

### 📊 Perubahan Database

#### **Tabel: research_requests (MODIFY)**
```sql
-- Field BARU:
+ requestingCenterId UUID REFERENCES centers(id)
  Center yang mengajukan request

+ approverRole VARCHAR(50) DEFAULT 'NATIONAL_ADMIN'
  Role yang berhak approve: 'NATIONAL_ADMIN' | 'SYSTEM_ADMIN'

+ visibilityLevel VARCHAR(20) DEFAULT 'IDENTIFIABLE'
  'AGGREGATED' - hanya statistik
  'ANONYMIZED' - data pasien tanpa identitas
  'IDENTIFIABLE' - data lengkap (butuh justifikasi kuat)

-- Field MODIFIED:
~ status ENUM (...)
  Tambahkan: 'PENDING_NATIONAL_APPROVAL', 'APPROVED_BY_NATIONAL'

-- Indexing untuk performa
CREATE INDEX idx_requests_center ON research_requests(requestingCenterId);
CREATE INDEX idx_requests_status ON research_requests(status);
```

#### **Tabel: research_request_approvals (NEW)**
```sql
CREATE TABLE research_request_approvals (
  id UUID PRIMARY KEY,
  requestId UUID REFERENCES research_requests(id),

  -- Approval chain
  approverLevel INT, -- 1 = National Admin, 2 = System Admin
  approverRole VARCHAR(50),
  approverId UUID REFERENCES users(id),

  -- Decision
  decision VARCHAR(20), -- 'APPROVED', 'REJECTED', 'REQUEST_MORE_INFO'
  decisionDate TIMESTAMP,
  notes TEXT,
  conditions TEXT, -- If approved with conditions

  -- Approval limits (if approved)
  dataAccessLevel VARCHAR(20), -- 'AGGREGATED', 'ANONYMIZED', 'IDENTIFIABLE'
  maxRecords INT, -- Max jumlah record yang bisa diakses
  expiresAt TIMESTAMP,

  createdAt TIMESTAMP DEFAULT NOW(),

  INDEX idx_approval_request(requestId)
);
```

### 🔧 API Changes

**Backend: research-requests.service.ts (MODIFY)**
```typescript
@Injectable()
export class ResearchRequestsService {

  /**
   * Create request - Save requesting center
   */
  async create(userId: string, dto: CreateResearchRequestDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { center: true }
    });

    if (!user.centerId) {
      throw new BadRequestException('User must belong to a center to request data');
    }

    const request = await this.prisma.researchRequest.create({
      data: {
        ...dto,
        requestingCenterId: user.centerId, // SAVE CENTER
        createdBy: userId,
        status: 'DRAFT',
      }
    });

    return request;
  }

  /**
   * Submit for NATIONAL approval (not center approval)
   */
  async submit(id: string, userId: string) {
    const request = await this.findOne(id, userId);

    if (request.status !== 'DRAFT') {
      throw new BadRequestException('Can only submit draft requests');
    }

    const updated = await this.prisma.researchRequest.update({
      where: { id },
      data: {
        status: 'PENDING_NATIONAL_APPROVAL', // NEW STATUS
        submittedAt: new Date(),
      },
    });

    // Notify NATIONAL_ADMIN users
    await this.notifyNationalAdmins(request);

    await this.logActivity(id, userId, 'SUBMITTED_TO_NATIONAL', 'DRAFT', 'PENDING_NATIONAL_APPROVAL');

    return updated;
  }

  /**
   * Get pending requests - ONLY for NATIONAL_ADMIN
   */
  async findPendingForApproval(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!['NATIONAL_ADMIN', 'SYSTEM_ADMIN'].includes(user.role)) {
      throw new ForbiddenException('Only national admins can approve requests');
    }

    return this.prisma.researchRequest.findMany({
      where: {
        status: { in: ['PENDING_NATIONAL_APPROVAL', 'UNDER_REVIEW'] },
      },
      include: {
        requestingCenter: true, // Include center info
        creator: { select: { id: true, name: true, email: true, center: true } },
      },
      orderBy: [
        { priority: 'desc' },
        { submittedAt: 'asc' },
      ],
    });
  }

  /**
   * National Admin approve/reject
   */
  async approveOrRejectByNational(
    requestId: string,
    adminId: string,
    dto: NationalApprovalDto
  ) {
    const admin = await this.prisma.user.findUnique({ where: { id: adminId } });

    if (!['NATIONAL_ADMIN', 'SYSTEM_ADMIN'].includes(admin.role)) {
      throw new ForbiddenException('Only national admins can approve requests');
    }

    const request = await this.findOne(requestId);

    if (request.status !== 'PENDING_NATIONAL_APPROVAL') {
      throw new BadRequestException('Request not pending national approval');
    }

    let newStatus: string;
    let dataAccessLevel: string = 'ANONYMIZED'; // Default

    switch (dto.decision) {
      case 'APPROVE':
        newStatus = 'APPROVED_BY_NATIONAL';
        dataAccessLevel = dto.dataAccessLevel || 'ANONYMIZED';
        break;
      case 'APPROVE_ANONYMIZED':
        newStatus = 'APPROVED_BY_NATIONAL';
        dataAccessLevel = 'ANONYMIZED';
        break;
      case 'APPROVE_IDENTIFIABLE':
        newStatus = 'APPROVED_BY_NATIONAL';
        dataAccessLevel = 'IDENTIFIABLE';
        if (!dto.justification) {
          throw new BadRequestException('Justification required for identifiable data access');
        }
        break;
      case 'REJECT':
        newStatus = 'REJECTED';
        break;
      case 'REQUEST_MORE_INFO':
        newStatus = 'NEED_MORE_INFO';
        break;
    }

    // Update request
    const updated = await this.prisma.researchRequest.update({
      where: { id: requestId },
      data: {
        status: newStatus as any,
        reviewedAt: new Date(),
        visibilityLevel: dataAccessLevel,
        ...(dto.decision.includes('APPROVE') && {
          approvedAt: new Date(),
          expiresAt: new Date(Date.now() + dto.accessDurationMonths * 30 * 24 * 60 * 60 * 1000),
        }),
      },
    });

    // Create approval record
    await this.prisma.researchRequestApproval.create({
      data: {
        requestId,
        approverLevel: admin.role === 'SYSTEM_ADMIN' ? 2 : 1,
        approverRole: admin.role,
        approverId: adminId,
        decision: dto.decision,
        decisionDate: new Date(),
        notes: dto.notes,
        conditions: dto.conditions,
        dataAccessLevel,
        maxRecords: dto.maxRecords,
        expiresAt: updated.expiresAt,
      },
    });

    await this.logActivity(requestId, adminId, dto.decision, request.status, newStatus, dto.notes);

    // Notify requester
    await this.notifyRequester(request, dto.decision, dto.notes);

    return updated;
  }

  /**
   * Notify national admins about new request
   */
  private async notifyNationalAdmins(request: any) {
    const nationalAdmins = await this.prisma.user.findMany({
      where: {
        role: { in: ['NATIONAL_ADMIN', 'SYSTEM_ADMIN'] },
        isActive: true,
      },
    });

    // TODO: Send email/notification to all national admins
    // For now, just log
    console.log(`Notifying ${nationalAdmins.length} national admins about request ${request.requestNumber}`);
  }
}
```

### 🔧 DTO Changes

**Backend: dto/national-approval.dto.ts (NEW)**
```typescript
export class NationalApprovalDto {
  @IsEnum(['APPROVE', 'APPROVE_ANONYMIZED', 'APPROVE_IDENTIFIABLE', 'REJECT', 'REQUEST_MORE_INFO'])
  decision: string;

  @IsOptional()
  @IsEnum(['AGGREGATED', 'ANONYMIZED', 'IDENTIFIABLE'])
  dataAccessLevel?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  conditions?: string; // Approval conditions

  @IsOptional()
  @IsString()
  justification?: string; // Required for IDENTIFIABLE access

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(24)
  accessDurationMonths?: number; // Can reduce from requested

  @IsOptional()
  @IsInt()
  maxRecords?: number; // Limit number of records
}
```

### 🖥️ Frontend Changes

**MODIFY: frontend/src/app/approvals/page.tsx**
```typescript
export default function ApprovalsPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<ResearchRequest[]>([]);

  // ONLY show if NATIONAL_ADMIN or SYSTEM_ADMIN
  useEffect(() => {
    if (!['NATIONAL_ADMIN', 'SYSTEM_ADMIN'].includes(user.role)) {
      router.push('/dashboard');
      return;
    }

    loadPendingRequests();
  }, []);

  const loadPendingRequests = async () => {
    const response = await fetch('/api/research-requests/pending-national');
    const data = await response.json();
    setRequests(data);
  };

  const handleApprove = async (requestId: string, level: string) => {
    const decision = await showApprovalModal(requestId, level);

    await fetch(`/api/research-requests/${requestId}/approve-national`, {
      method: 'POST',
      body: JSON.stringify(decision)
    });

    loadPendingRequests();
  };

  return (
    <Layout>
      <h1>Antrian Persetujuan Nasional</h1>

      <Alert type="info">
        Sebagai National Admin, Anda bertanggung jawab menyetujui/menolak
        permintaan akses data dari seluruh center.
      </Alert>

      <table>
        <thead>
          <tr>
            <th>Request Number</th>
            <th>Requesting Center</th>
            <th>Researcher</th>
            <th>Data Requested</th>
            <th>Justification</th>
            <th>Submitted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req.id}>
              <td>{req.requestNumber}</td>
              <td>{req.requestingCenter.name}</td>
              <td>{req.creator.name}</td>
              <td>{req.requestedDataFields.length} fields</td>
              <td>{req.researchAbstract.substring(0, 100)}...</td>
              <td>{formatDate(req.submittedAt)}</td>
              <td>
                <button onClick={() => handleApprove(req.id, 'ANONYMIZED')}>
                  Approve (Anonymized)
                </button>
                <button onClick={() => handleApprove(req.id, 'IDENTIFIABLE')}>
                  Approve (Identifiable)
                </button>
                <button onClick={() => handleReject(req.id)}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
```

### ⚠️ Impact Analysis
- **HIGH**: Mengubah approval flow secara fundamental
- **Files Affected**: ~12 files (backend + frontend)
- **Migration Required**: NO (existing requests can continue with old flow)
- **Testing Required**: Authorization, approval chain, notifications

---

## 5️⃣ Activity Logging System

### 🎯 Tujuan
Audit trail lengkap untuk semua aktivitas di setiap center. National admin dapat melihat log semua center, center admin hanya centernya sendiri.

### 📊 Database Schema

#### **Tabel BARU: activity_logs**
```sql
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY,

  -- Actor (who did the action)
  actorId UUID REFERENCES users(id),
  actorName VARCHAR(255),
  actorRole VARCHAR(50),
  actorCenterId UUID REFERENCES centers(id),

  -- Action details
  action VARCHAR(100), -- 'CREATE_PATIENT', 'UPDATE_PATIENT', 'DELETE_PATIENT', 'LOGIN', 'APPROVE_REQUEST', etc
  entity VARCHAR(50), -- 'patient', 'user', 'research_request', 'center', etc
  entityId UUID, -- ID of affected entity

  -- Change tracking
  changesBefore JSONB, -- Previous state
  changesAfter JSONB, -- New state

  -- Metadata
  ipAddress VARCHAR(45),
  userAgent TEXT,
  requestMethod VARCHAR(10), -- GET, POST, PUT, DELETE
  requestPath VARCHAR(255),

  -- Context
  centerId UUID REFERENCES centers(id), -- Center where action occurred
  sessionId VARCHAR(255),

  -- Timestamps
  createdAt TIMESTAMP DEFAULT NOW(),

  -- Indexes untuk query cepat
  INDEX idx_logs_actor(actorId),
  INDEX idx_logs_center(centerId),
  INDEX idx_logs_action(action),
  INDEX idx_logs_entity(entity, entityId),
  INDEX idx_logs_date(createdAt),
  INDEX idx_logs_center_date(centerId, createdAt)
);

-- Partition by month untuk performa (opsional, untuk high-volume)
-- CREATE TABLE activity_logs_2025_01 PARTITION OF activity_logs
-- FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');
```

### 🔧 Logging Service

**Backend: activity-logger.service.ts (NEW)**
```typescript
@Injectable()
export class ActivityLoggerService {
  constructor(private prisma: PrismaService) {}

  /**
   * Log any activity
   */
  async log(params: {
    actorId: string;
    action: string;
    entity: string;
    entityId?: string;
    changesBefore?: any;
    changesAfter?: any;
    ipAddress?: string;
    userAgent?: string;
    requestMethod?: string;
    requestPath?: string;
    centerId?: string;
    sessionId?: string;
  }) {
    // Get actor details
    const actor = await this.prisma.user.findUnique({
      where: { id: params.actorId },
      select: {
        name: true,
        role: true,
        centerId: true,
      },
    });

    if (!actor) {
      console.error('Actor not found:', params.actorId);
      return;
    }

    // Create log entry
    await this.prisma.activityLog.create({
      data: {
        actorId: params.actorId,
        actorName: actor.name,
        actorRole: actor.role,
        actorCenterId: actor.centerId,
        action: params.action,
        entity: params.entity,
        entityId: params.entityId,
        changesBefore: params.changesBefore || null,
        changesAfter: params.changesAfter || null,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
        requestMethod: params.requestMethod,
        requestPath: params.requestPath,
        centerId: params.centerId || actor.centerId,
        sessionId: params.sessionId,
      },
    });
  }

  /**
   * Get logs dengan filtering
   */
  async getLogs(filters: {
    centerId?: string;
    actorId?: string;
    action?: string;
    entity?: string;
    startDate?: Date;
    endDate?: Date;
    page?: number;
    limit?: number;
  }) {
    const where: any = {};

    if (filters.centerId) where.centerId = filters.centerId;
    if (filters.actorId) where.actorId = filters.actorId;
    if (filters.action) where.action = filters.action;
    if (filters.entity) where.entity = filters.entity;
    if (filters.startDate || filters.endDate) {
      where.createdAt = {
        ...(filters.startDate && { gte: filters.startDate }),
        ...(filters.endDate && { lte: filters.endDate }),
      };
    }

    const page = filters.page || 1;
    const limit = filters.limit || 50;
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      this.prisma.activityLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          actor: {
            select: { name: true, email: true, role: true },
          },
          center: {
            select: { name: true, code: true },
          },
        },
      }),
      this.prisma.activityLog.count({ where }),
    ]);

    return {
      logs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Get center activity summary
   */
  async getCenterActivitySummary(centerId: string, days: number = 30) {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const summary = await this.prisma.activityLog.groupBy({
      by: ['action'],
      where: {
        centerId,
        createdAt: { gte: since },
      },
      _count: { action: true },
    });

    const uniqueUsers = await this.prisma.activityLog.findMany({
      where: {
        centerId,
        createdAt: { gte: since },
      },
      distinct: ['actorId'],
      select: { actorId: true },
    });

    return {
      totalActivities: summary.reduce((sum, s) => sum + s._count.action, 0),
      byAction: summary,
      uniqueActiveUsers: uniqueUsers.length,
      period: `Last ${days} days`,
    };
  }

  /**
   * Get national activity summary (all centers)
   */
  async getNationalActivitySummary(days: number = 30) {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const byCenter = await this.prisma.activityLog.groupBy({
      by: ['centerId'],
      where: {
        createdAt: { gte: since },
      },
      _count: { centerId: true },
    });

    const centerDetails = await this.prisma.center.findMany({
      where: {
        id: { in: byCenter.map(c => c.centerId) },
      },
      select: { id: true, name: true, code: true },
    });

    return byCenter.map(c => ({
      center: centerDetails.find(cd => cd.id === c.centerId),
      activityCount: c._count.centerId,
    }));
  }
}
```

### 🔧 Interceptor untuk Auto-Logging

**Backend: logging.interceptor.ts (NEW)**
```typescript
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private activityLogger: ActivityLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, user, ip, headers } = request;

    // Auto-log semua requests (filter by important endpoints)
    if (this.shouldLog(method, url)) {
      const startTime = Date.now();

      return next.handle().pipe(
        tap((data) => {
          const duration = Date.now() - startTime;

          // Log successful requests
          this.activityLogger.log({
            actorId: user?.id,
            action: this.deriveAction(method, url),
            entity: this.deriveEntity(url),
            entityId: this.deriveEntityId(url, data),
            ipAddress: ip,
            userAgent: headers['user-agent'],
            requestMethod: method,
            requestPath: url,
            centerId: user?.centerId,
            sessionId: headers['x-session-id'],
          });
        })
      );
    }

    return next.handle();
  }

  private shouldLog(method: string, url: string): boolean {
    // Log POST, PUT, DELETE (mutations)
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
      return true;
    }

    // Log important GET requests
    if (url.includes('/admin/') || url.includes('/approvals/')) {
      return true;
    }

    return false;
  }

  private deriveAction(method: string, url: string): string {
    // Parse URL to determine action
    if (url.includes('/patients')) {
      if (method === 'POST') return 'CREATE_PATIENT';
      if (method === 'PUT' || method === 'PATCH') return 'UPDATE_PATIENT';
      if (method === 'DELETE') return 'DELETE_PATIENT';
    }

    if (url.includes('/research-requests')) {
      if (url.includes('/approve')) return 'APPROVE_RESEARCH_REQUEST';
      if (url.includes('/reject')) return 'REJECT_RESEARCH_REQUEST';
      if (method === 'POST') return 'CREATE_RESEARCH_REQUEST';
    }

    if (url.includes('/users')) {
      if (method === 'POST') return 'CREATE_USER';
      if (method === 'PUT') return 'UPDATE_USER';
      if (method === 'DELETE') return 'DELETE_USER';
    }

    if (url.includes('/auth/login')) return 'LOGIN';
    if (url.includes('/auth/logout')) return 'LOGOUT';

    return `${method}_${url.split('/')[2]?.toUpperCase() || 'UNKNOWN'}`;
  }

  private deriveEntity(url: string): string {
    if (url.includes('/patients')) return 'patient';
    if (url.includes('/users')) return 'user';
    if (url.includes('/research-requests')) return 'research_request';
    if (url.includes('/centers')) return 'center';
    return 'unknown';
  }

  private deriveEntityId(url: string, responseData: any): string | undefined {
    // Try to extract ID from URL
    const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
    const match = url.match(uuidRegex);
    if (match) return match[0];

    // Try to get ID from response
    if (responseData?.id) return responseData.id;

    return undefined;
  }
}
```

### 🖥️ Frontend - Activity Logs Page

**NEW: frontend/src/app/admin/audit-logs/page.tsx**
```typescript
'use client';

export default function AuditLogsPage() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [filters, setFilters] = useState({
    centerId: user.role === 'NATIONAL_ADMIN' ? '' : user.centerId,
    action: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    loadLogs();
  }, [filters]);

  const loadLogs = async () => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/activity-logs?${query}`);
    const data = await response.json();
    setLogs(data.logs);
  };

  return (
    <Layout>
      <h1>Activity Logs</h1>

      {/* Filter Panel */}
      <div className="filters">
        {user.role === 'NATIONAL_ADMIN' && (
          <select
            value={filters.centerId}
            onChange={(e) => setFilters({...filters, centerId: e.target.value})}
          >
            <option value="">Semua Center</option>
            {centers.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        )}

        <select
          value={filters.action}
          onChange={(e) => setFilters({...filters, action: e.target.value})}
        >
          <option value="">Semua Aktivitas</option>
          <option value="CREATE_PATIENT">Create Patient</option>
          <option value="UPDATE_PATIENT">Update Patient</option>
          <option value="DELETE_PATIENT">Delete Patient</option>
          <option value="LOGIN">Login</option>
          <option value="APPROVE_RESEARCH_REQUEST">Approve Request</option>
        </select>

        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => setFilters({...filters, startDate: e.target.value})}
        />
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilters({...filters, endDate: e.target.value})}
        />
      </div>

      {/* Logs Table */}
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>User</th>
            <th>Action</th>
            <th>Entity</th>
            <th>Center</th>
            <th>IP Address</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td>{formatDateTime(log.createdAt)}</td>
              <td>
                {log.actorName}
                <br />
                <small>{log.actorRole}</small>
              </td>
              <td>
                <span className={`badge badge-${getActionColor(log.action)}`}>
                  {log.action}
                </span>
              </td>
              <td>{log.entity}</td>
              <td>{log.center?.name}</td>
              <td>{log.ipAddress}</td>
              <td>
                <button onClick={() => showDetails(log)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Activity Summary */}
      <div className="summary">
        <h3>Summary (Last 30 Days)</h3>
        <ActivitySummaryChart centerId={filters.centerId} />
      </div>
    </Layout>
  );
}
```

### ⚠️ Impact Analysis
- **MEDIUM**: New feature dengan interceptor global
- **Files Affected**: ~8 new files
- **Migration Required**: NO (new tables only)
- **Performance**: Perlu monitoring, consider async logging untuk high-volume

---

## 6️⃣ Automated Password Reset Timer

### 🎯 Tujuan
Sistem untuk memaksa user mengganti password secara berkala (konfigurasi per-user atau per-role).

### 📊 Database Changes

#### **Tabel: users (MODIFY)**
```sql
-- Field BARU:
+ passwordChangedAt TIMESTAMP
  Last time password was changed

+ passwordExpiresAt TIMESTAMP
  When password expires (auto-calculated)

+ passwordResetInterval INT DEFAULT 90
  Days until password expires (configurable per user)
  NULL = no expiration

+ passwordResetReminderSent BOOLEAN DEFAULT FALSE
  Flag untuk tracking reminder email

+ passwordExpired BOOLEAN GENERATED ALWAYS AS (
    passwordExpiresAt IS NOT NULL AND passwordExpiresAt < NOW()
  ) STORED
  Virtual column untuk check expired

+ forcePasswordChange BOOLEAN DEFAULT FALSE
  Admin can force user to change password

-- Index
CREATE INDEX idx_users_password_expires ON users(passwordExpiresAt);
```

#### **Tabel BARU: password_policies**
```sql
CREATE TABLE password_policies (
  id UUID PRIMARY KEY,

  -- Policy configuration
  role VARCHAR(50), -- Apply to specific role (nullable for default)
  centerId UUID REFERENCES centers(id), -- Apply to specific center (nullable for global)

  -- Password expiry settings
  expiryDays INT, -- NULL = no expiry
  reminderDaysBefore INT DEFAULT 7, -- Send reminder N days before expiry

  -- Password complexity
  minLength INT DEFAULT 8,
  requireUppercase BOOLEAN DEFAULT TRUE,
  requireLowercase BOOLEAN DEFAULT TRUE,
  requireNumbers BOOLEAN DEFAULT TRUE,
  requireSpecialChars BOOLEAN DEFAULT TRUE,

  -- Password history (prevent reuse)
  preventReuseCount INT DEFAULT 3, -- Can't reuse last N passwords

  -- Metadata
  isActive BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),

  -- Uniqueness: one policy per role+center combination
  UNIQUE(role, centerId)
);

-- Default policies
INSERT INTO password_policies (role, expiryDays, minLength) VALUES
  ('NATIONAL_ADMIN', 30, 12),    -- National admins: 30 days, 12 chars
  ('SYSTEM_ADMIN', 30, 12),       -- System admins: 30 days, 12 chars
  ('CENTER_ADMIN', 60, 10),       -- Center admins: 60 days, 10 chars
  ('DATA_ENTRY', 90, 8),          -- Data entry: 90 days, 8 chars
  ('RESEARCHER', 90, 8),          -- Researchers: 90 days, 8 chars
  (NULL, NULL, 8);                -- Default: no expiry, 8 chars
```

#### **Tabel BARU: password_history**
```sql
CREATE TABLE password_history (
  id UUID PRIMARY KEY,
  userId UUID REFERENCES users(id),
  passwordHash VARCHAR(255), -- Hashed password
  changedAt TIMESTAMP DEFAULT NOW(),
  changedBy UUID REFERENCES users(id), -- Self or admin
  reason VARCHAR(50), -- 'MANUAL', 'EXPIRED', 'FORCED', 'RESET'

  INDEX idx_password_history_user(userId)
);
```

### 🔧 Password Policy Service

**Backend: password-policy.service.ts (NEW)**
```typescript
@Injectable()
export class PasswordPolicyService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get applicable policy for user
   */
  async getPolicyForUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true, centerId: true },
    });

    if (!user) throw new NotFoundException('User not found');

    // Priority: role+center > role > center > default
    const policies = await this.prisma.passwordPolicy.findMany({
      where: {
        isActive: true,
        OR: [
          { role: user.role, centerId: user.centerId }, // Exact match
          { role: user.role, centerId: null },           // Role match
          { role: null, centerId: user.centerId },       // Center match
          { role: null, centerId: null },                // Default
        ],
      },
      orderBy: [
        { role: 'asc' },
        { centerId: 'asc' },
      ],
    });

    // Return most specific policy
    return policies[0] || this.getDefaultPolicy();
  }

  /**
   * Calculate password expiry date
   */
  calculateExpiryDate(policy: any): Date | null {
    if (!policy.expiryDays) return null;

    const now = new Date();
    const expiryDate = new Date(now.getTime() + policy.expiryDays * 24 * 60 * 60 * 1000);
    return expiryDate;
  }

  /**
   * Check if password meets policy requirements
   */
  async validatePassword(userId: string, newPassword: string): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const policy = await this.getPolicyForUser(userId);
    const errors: string[] = [];

    // Length
    if (newPassword.length < policy.minLength) {
      errors.push(`Password must be at least ${policy.minLength} characters`);
    }

    // Uppercase
    if (policy.requireUppercase && !/[A-Z]/.test(newPassword)) {
      errors.push('Password must contain uppercase letter');
    }

    // Lowercase
    if (policy.requireLowercase && !/[a-z]/.test(newPassword)) {
      errors.push('Password must contain lowercase letter');
    }

    // Numbers
    if (policy.requireNumbers && !/[0-9]/.test(newPassword)) {
      errors.push('Password must contain number');
    }

    // Special chars
    if (policy.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      errors.push('Password must contain special character');
    }

    // Check password history (prevent reuse)
    if (policy.preventReuseCount > 0) {
      const isReused = await this.checkPasswordReuse(userId, newPassword, policy.preventReuseCount);
      if (isReused) {
        errors.push(`Cannot reuse last ${policy.preventReuseCount} passwords`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Check if password was recently used
   */
  private async checkPasswordReuse(userId: string, newPassword: string, count: number): Promise<boolean> {
    const bcrypt = require('bcrypt');

    const recentPasswords = await this.prisma.passwordHistory.findMany({
      where: { userId },
      orderBy: { changedAt: 'desc' },
      take: count,
      select: { passwordHash: true },
    });

    for (const record of recentPasswords) {
      const isMatch = await bcrypt.compare(newPassword, record.passwordHash);
      if (isMatch) return true;
    }

    return false;
  }

  /**
   * Update user password with policy enforcement
   */
  async updatePassword(userId: string, newPassword: string, reason: string, changedBy?: string) {
    const bcrypt = require('bcrypt');

    // Validate against policy
    const validation = await this.validatePassword(userId, newPassword);
    if (!validation.isValid) {
      throw new BadRequestException(validation.errors.join(', '));
    }

    const policy = await this.getPolicyForUser(userId);
    const passwordHash = await bcrypt.hash(newPassword, 10);
    const passwordExpiresAt = this.calculateExpiryDate(policy);

    // Update user
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash,
        passwordChangedAt: new Date(),
        passwordExpiresAt,
        passwordResetReminderSent: false,
        forcePasswordChange: false,
      },
    });

    // Save to password history
    await this.prisma.passwordHistory.create({
      data: {
        userId,
        passwordHash,
        changedBy: changedBy || userId,
        reason,
      },
    });

    return user;
  }

  /**
   * Get default policy
   */
  private getDefaultPolicy() {
    return {
      expiryDays: null,
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      preventReuseCount: 3,
    };
  }
}
```

### 🔧 Cron Job - Check Expiring Passwords

**Backend: password-expiry.cron.ts (NEW)**
```typescript
@Injectable()
export class PasswordExpiryCron {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService,
  ) {}

  /**
   * Run daily at 8 AM to check expiring passwords
   */
  @Cron('0 8 * * *')
  async checkExpiringPasswords() {
    console.log('Checking expiring passwords...');

    const now = new Date();
    const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Find users with passwords expiring in 7 days
    const expiringUsers = await this.prisma.user.findMany({
      where: {
        passwordExpiresAt: {
          gte: now,
          lte: sevenDaysLater,
        },
        passwordResetReminderSent: false,
        isActive: true,
      },
    });

    console.log(`Found ${expiringUsers.length} users with expiring passwords`);

    // Send reminders
    for (const user of expiringUsers) {
      await this.sendExpiryReminder(user);

      // Mark reminder as sent
      await this.prisma.user.update({
        where: { id: user.id },
        data: { passwordResetReminderSent: true },
      });
    }
  }

  /**
   * Run daily to lock users with expired passwords
   */
  @Cron('0 9 * * *')
  async lockExpiredAccounts() {
    const now = new Date();

    // Find users with expired passwords
    const expiredUsers = await this.prisma.user.findMany({
      where: {
        passwordExpiresAt: { lt: now },
        forcePasswordChange: false,
        isActive: true,
      },
    });

    console.log(`Found ${expiredUsers.length} users with expired passwords`);

    // Force password change
    for (const user of expiredUsers) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { forcePasswordChange: true },
      });

      await this.notificationService.sendEmail({
        to: user.email,
        subject: 'Password Expired - Action Required',
        template: 'password-expired',
        data: {
          name: user.name,
          expiryDate: user.passwordExpiresAt,
        },
      });
    }
  }

  private async sendExpiryReminder(user: any) {
    const daysUntilExpiry = Math.ceil(
      (user.passwordExpiresAt.getTime() - Date.now()) / (24 * 60 * 60 * 1000)
    );

    await this.notificationService.sendEmail({
      to: user.email,
      subject: `Password Expires in ${daysUntilExpiry} Days`,
      template: 'password-expiry-reminder',
      data: {
        name: user.name,
        daysUntilExpiry,
        expiryDate: user.passwordExpiresAt,
        changePasswordUrl: `${process.env.FRONTEND_URL}/settings/change-password`,
      },
    });
  }
}
```

### 🔧 Auth Middleware - Check Password Expiry

**Backend: auth.guard.ts (MODIFY)**
```typescript
@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) return false;

    // Allow access to change password even if expired
    if (request.path === '/api/auth/change-password') {
      return true;
    }

    // Check if password expired
    if (user.forcePasswordChange || user.passwordExpired) {
      throw new ForbiddenException({
        message: 'Password expired. Please change your password.',
        code: 'PASSWORD_EXPIRED',
        redirectTo: '/change-password',
      });
    }

    return true;
  }
}
```

### 🖥️ Frontend - Password Change Flow

**NEW: frontend/src/app/change-password/page.tsx**
```typescript
'use client';

export default function ChangePasswordPage() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  // Check if password expired
  useEffect(() => {
    if (user?.passwordExpired || user?.forcePasswordChange) {
      // Locked in this page until password changed
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrors(['Passwords do not match']);
      return;
    }

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        setErrors(error.errors || [error.message]);
        return;
      }

      // Success
      alert('Password changed successfully!');
      router.push('/dashboard');
    } catch (error) {
      setErrors(['Failed to change password']);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {user?.passwordExpired && (
          <Alert type="error">
            ⚠️ Your password has expired. You must change it to continue.
          </Alert>
        )}

        {user?.forcePasswordChange && (
          <Alert type="warning">
            🔒 Admin has required you to change your password.
          </Alert>
        )}

        <h1 className="text-2xl font-bold mb-6">Change Password</h1>

        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
            <ul>
              {errors.map((err, i) => (
                <li key={i} className="text-red-800">{err}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <PasswordStrengthIndicator password={newPassword} />
          </div>

          <div className="mb-6">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full btn btn-primary">
            Change Password
          </button>
        </form>

        {/* Policy Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold mb-2">Password Requirements:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Minimum 8 characters</li>
            <li>✓ At least one uppercase letter</li>
            <li>✓ At least one lowercase letter</li>
            <li>✓ At least one number</li>
            <li>✓ At least one special character</li>
            <li>✓ Cannot reuse last 3 passwords</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
```

**MODIFY: frontend/src/app/settings/page.tsx**
```typescript
// Add password expiry info in settings
<div className="password-section">
  <h3>Password Security</h3>

  {user.passwordExpiresAt && (
    <div className="expiry-info">
      <p>Your password expires on:
        <strong>{formatDate(user.passwordExpiresAt)}</strong>
      </p>
      {daysUntilExpiry < 7 && (
        <Alert type="warning">
          Password expires in {daysUntilExpiry} days!
        </Alert>
      )}
    </div>
  )}

  <button onClick={() => router.push('/change-password')}>
    Change Password
  </button>
</div>
```

### ⚠️ Impact Analysis
- **MEDIUM**: New feature dengan impact pada login flow
- **Files Affected**: ~10 new files
- **Migration Required**: YES - Add new columns to users table
- **Testing Required**: Cron jobs, email notifications, policy enforcement

---

## 🔄 Migration Strategy

### Phase 1: Preparation (Week 1)
1. Backup database lengkap
2. Create migration scripts
3. Setup staging environment
4. Test migrations di staging

### Phase 2: Critical Changes (Week 2-3)
1. Implementasi Requirement 1-2 (Anonimisasi + MR Generator)
   - Deploy database changes
   - Run data migration
   - Update backend APIs
   - Update frontend UI
   - Testing intensive

### Phase 3: Request & Approval (Week 4)
1. Implementasi Requirement 3-4 (Dashboard + Request System)
   - Deploy new tables
   - Update approval flow
   - Testing approval chain

### Phase 4: Logging & Security (Week 5)
1. Implementasi Requirement 5-6 (Logs + Password)
   - Deploy logging system
   - Setup cron jobs
   - Configure password policies
   - Testing automation

### Phase 5: UAT & Deployment (Week 6)
1. User Acceptance Testing
2. Performance testing
3. Security audit
4. Production deployment
5. Training & documentation

---

## ⚠️ Risks & Mitigation

### Risk 1: Data Loss during Migration
**Mitigation:**
- Full database backup before migration
- Archive PII data ke tabel terpisah
- Dry-run migrations di staging
- Rollback plan tested

### Risk 2: User Confusion (No Patient Names)
**Mitigation:**
- Clear UI messaging
- Training materials
- Support documentation
- Gradual rollout with feedback

### Risk 3: Performance Impact (Logging)
**Mitigation:**
- Async logging
- Database indexing
- Log rotation/archival
- Monitoring alerts

### Risk 4: Password Lock-out Issues
**Mitigation:**
- Admin override capability
- Grace period before force-lock
- Clear email notifications
- Support helpdesk ready

---

## 📊 Success Metrics

### Privacy & Compliance
- ✅ 0 patient names visible in UI
- ✅ 100% identifiable data encrypted
- ✅ Audit trail for all access

### Operational
- ✅ <100ms overhead untuk logging
- ✅ >99.9% uptime
- ✅ <5% support tickets untuk password issues

### User Adoption
- ✅ >90% users change password on time
- ✅ <10% approval rejections
- ✅ >95% user satisfaction

---

## 📝 Documentation Required

1. **Technical Documentation**
   - API changes documentation
   - Database schema changes
   - Migration guides

2. **User Documentation**
   - Patient entry without names guide
   - Research request process
   - Password management guide

3. **Admin Documentation**
   - Approval workflow guide
   - Activity logs interpretation
   - Password policy configuration

---

## 💰 Effort Estimation

| Requirement | Backend | Frontend | Testing | Total |
|------------|---------|----------|---------|-------|
| 1. Anonimisasi | 16h | 12h | 8h | **36h** |
| 2. MR Generator | 12h | 8h | 6h | **26h** |
| 3. Dashboard Nasional | 16h | 16h | 8h | **40h** |
| 4. Request System | 12h | 12h | 6h | **30h** |
| 5. Activity Logs | 16h | 12h | 8h | **36h** |
| 6. Password Timer | 16h | 8h | 6h | **30h** |
| **TOTAL** | **88h** | **68h** | **42h** | **198h (~5 weeks)** |

---

## ✅ Next Steps

1. **Review** dokumen ini dengan stakeholders
2. **Approve** prioritas dan timeline
3. **Setup** staging environment
4. **Start** dengan Requirement 1-2 (critical)
5. **Deploy** secara bertahap dengan monitoring ketat

---

**Prepared by:** Claude Code
**Date:** 28 Desember 2025
**Status:** Awaiting Review & Approval
