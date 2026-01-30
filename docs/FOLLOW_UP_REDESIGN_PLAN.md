# 📋 Rencana Redesign Follow-up Management
**Tanggal**: 2025-12-28
**Status**: REVIEW PENDING
**Prioritas**: P0 - CRITICAL

---

## 🎯 Executive Summary

Setelah analisis mendalam terhadap dokumen resmi "Indonesian Musculoskeletal Tumor Registry (1).docx" dibandingkan dengan implementasi saat ini, ditemukan **GAP KRITIS** pada:

1. ❌ **JADWAL FOLLOW-UP SALAH** di frontend wizard (Section9FollowUpManagement.tsx)
2. ⚠️ **DATA FIELDS TIDAK LENGKAP** - Missing Dokter Pemeriksa, Keluhan, Pemeriksaan Fisik
3. ✅ **BACKEND SERVICE SUDAH BENAR** - Timing calculation sesuai protokol
4. ⚠️ **DATABASE PERLU ENHANCEMENT** - Tambah field sesuai dokumen

---

## 📊 Gap Analysis Detail

### 1. JADWAL FOLLOW-UP (CRITICAL MISMATCH)

#### Dokumen Resmi Requirement:
```
Follow Up I    →  3 bulan post treatment  (Year 1)
Follow Up II   →  6 bulan post treatment  (Year 1)
Follow Up III  →  9 bulan post treatment  (Year 1)
Follow Up IV   → 12 bulan post treatment  (Year 1)
Follow Up V    → 15 bulan post treatment  (Year 2)
Follow Up VI   → 18 bulan post treatment  (Year 2)
Follow Up VII  → 21 bulan post treatment  (Year 2)
Follow Up VIII → 24 bulan post treatment  (Year 2)
Follow Up IX   → 30 bulan post treatment  (Year 3)
Follow Up X    → 36 bulan post treatment  (Year 3)
Follow Up XI   → 42 bulan post treatment  (Year 4)
Follow Up XII  → 48 bulan post treatment  (Year 4)
Follow Up XIII → 54 bulan post treatment  (Year 5)
Follow Up XIV  → 60 bulan post treatment  (Year 5)

TOTAL: 14 visits over 5 years
Year 1-2: Every 3 months (8 visits)
Year 3-5: Every 6 months (6 visits)
```

#### Current Implementation Status:

**✅ BACKEND SERVICE (follow-ups.service.ts) - CORRECT!**
```typescript
// Lines 40-50: Year 1-2 calculation
for (let i = 1; i <= 8; i++) {
  scheduledDate.setMonth(baseDate.getMonth() + i * 3);
  // Generates: 3, 6, 9, 12, 15, 18, 21, 24 months ✅
}

// Lines 54-64: Year 3-5 calculation
for (let i = 1; i <= 6; i++) {
  scheduledDate.setMonth(baseDate.getMonth() + 24 + i * 6);
  // Generates: 30, 36, 42, 48, 54, 60 months ✅
}
```

**❌ FRONTEND WIZARD (Section9FollowUpManagement.tsx) - WRONG!**
```typescript
// Lines 27-42: INCORRECT SCHEDULE
const FOLLOW_UP_SCHEDULE = [
  { visit: 1, month: 3 },    // ✅ Correct
  { visit: 2, month: 6 },    // ✅ Correct
  { visit: 3, month: 9 },    // ✅ Correct
  { visit: 4, month: 12 },   // ✅ Correct
  { visit: 5, month: 18 },   // ❌ SHOULD BE 15!
  { visit: 6, month: 24 },   // ❌ SHOULD BE 18!
  { visit: 7, month: 30 },   // ❌ SHOULD BE 21!
  { visit: 8, month: 36 },   // ❌ SHOULD BE 24!
  { visit: 9, month: 48 },   // ❌ SHOULD BE 30!
  { visit: 10, month: 60 },  // ❌ SHOULD BE 36!
  { visit: 11, month: 72 },  // ❌ SHOULD BE 42!
  { visit: 12, month: 84 },  // ❌ SHOULD BE 48!
  { visit: 13, month: 96 },  // ❌ SHOULD BE 54!
  { visit: 14, month: 120 }, // ❌ SHOULD BE 60!
];
```

**IMPACT**: Frontend wizard shows WRONG months to users! Inconsistent with backend and official protocol.

---

### 2. DATA FIELDS GAP

#### Dokumen Requirement per Visit:
1. ✅ **Tanggal** → Current: `actualDate` (GOOD)
2. ⚠️ **Dokter Pemeriksa** → Current: `completedBy` (exists but needs enhancement)
3. ❌ **Keluhan** → Current: Mixed in `notes` (NEED SEPARATE FIELD)
4. ❌ **Pemeriksaan Fisik** → Current: MISSING (NEED NEW FIELD)
5. ⚠️ **Pemeriksaan Penunjang** → Current: `imagingFindings` + `labResults` (need better structure)
6. ✅ **MSTS Score** → Current: `mstsScoreId` (GOOD, but need to verify linkage)

#### Current Database Schema (`FollowUpVisit` model):
```prisma
model FollowUpVisit {
  id                String    @id @default(cuid())
  patientId         String
  visitNumber       Int // 1-14
  scheduledDate     DateTime
  actualDate        DateTime?        // ✅ Tanggal
  visitType         String
  status            String
  clinicalStatus    String?
  localRecurrence   Boolean?
  distantMetastasis Boolean?
  metastasisSites   String?
  currentTreatment  String?
  mstsScoreId       String?          // ✅ MSTS Score
  karnofskyScore    Int?
  imagingPerformed  String?          // ⚠️ Pemeriksaan Penunjang (partial)
  imagingFindings   String?          // ⚠️ Pemeriksaan Penunjang (partial)
  labResults        String?          // ⚠️ Pemeriksaan Penunjang (partial)
  complications     String?
  nextVisitDate     DateTime?
  completedBy       String?          // ⚠️ Dokter Pemeriksa (exists but generic)
  notes             String?          // ⚠️ Contains Keluhan + other notes mixed
  createdAt         DateTime
  updatedAt         DateTime
}
```

**MISSING FIELDS:**
- ❌ `chiefComplaint` or `keluhan` - Keluhan utama pasien saat kunjungan
- ❌ `physicalExamination` or `pemeriksaanFisik` - Hasil pemeriksaan fisik
- ⚠️ `examinedBy` or better naming for `completedBy` - Nama dokter pemeriksa

---

### 3. FRONTEND UI/UX GAP

#### Current Implementation (Section9FollowUpManagement.tsx):

**✅ GOOD PARTS:**
- Beautiful UI with progress tracking
- 14-visit timeline visualization
- MSTS Score calculator (Upper/Lower extremity)
- Disease status tracking
- Imaging and lab results fields
- Clinical notes

**❌ MISSING FROM DOCUMENT:**
- No explicit "Dokter Pemeriksa" field (UI doesn't show `completedBy`)
- No "Keluhan" (Chief Complaint) dedicated field
- No "Pemeriksaan Fisik" (Physical Examination) dedicated field
- "Pemeriksaan Penunjang" not clearly labeled as per document

---

## 🔧 Proposed Changes

### **Phase 1: CRITICAL FIX - Frontend Schedule** ⚡ (URGENT)

**File**: `/home/yopi/Projects/tumor-registry/frontend/src/components/patients/wizard/sections/Section9FollowUpManagement.tsx`

**Lines 27-42**: Replace FOLLOW_UP_SCHEDULE constant

```typescript
// BEFORE (WRONG):
const FOLLOW_UP_SCHEDULE = [
  { visit: 1, month: 3, label: '3 months' },
  { visit: 2, month: 6, label: '6 months' },
  { visit: 3, month: 9, label: '9 months' },
  { visit: 4, month: 12, label: '1 year' },
  { visit: 5, month: 18, label: '18 months' },    // WRONG!
  { visit: 6, month: 24, label: '2 years' },      // WRONG!
  { visit: 7, month: 30, label: '30 months' },    // WRONG!
  { visit: 8, month: 36, label: '3 years' },      // WRONG!
  { visit: 9, month: 48, label: '4 years' },      // WRONG!
  { visit: 10, month: 60, label: '5 years' },     // WRONG!
  { visit: 11, month: 72, label: '6 years' },     // WRONG!
  { visit: 12, month: 84, label: '7 years' },     // WRONG!
  { visit: 13, month: 96, label: '8 years' },     // WRONG!
  { visit: 14, month: 120, label: '10 years' },   // WRONG!
];

// AFTER (CORRECT - per document):
const FOLLOW_UP_SCHEDULE = [
  // Year 1-2: Every 3 months (8 visits)
  { visit: 1, month: 3, label: '3 months', year: 1 },
  { visit: 2, month: 6, label: '6 months', year: 1 },
  { visit: 3, month: 9, label: '9 months', year: 1 },
  { visit: 4, month: 12, label: '1 year', year: 1 },
  { visit: 5, month: 15, label: '15 months', year: 2 },
  { visit: 6, month: 18, label: '18 months', year: 2 },
  { visit: 7, month: 21, label: '21 months', year: 2 },
  { visit: 8, month: 24, label: '2 years', year: 2 },
  // Year 3-5: Every 6 months (6 visits)
  { visit: 9, month: 30, label: '30 months', year: 3 },
  { visit: 10, month: 36, label: '3 years', year: 3 },
  { visit: 11, month: 42, label: '42 months', year: 4 },
  { visit: 12, month: 48, label: '4 years', year: 4 },
  { visit: 13, month: 54, label: '54 months', year: 5 },
  { visit: 14, month: 60, label: '5 years', year: 5 },
];
```

**Why `year` field added?**: For UI grouping and better visualization (Year 1-2 vs Year 3-5).

**Testing**: Verify frontend wizard initializes visits with correct `scheduledMonth` values.

---

### **Phase 2: DATABASE ENHANCEMENT** 📊

**File**: `/home/yopi/Projects/tumor-registry/backend/prisma/schema.prisma`

**Enhancement 1**: Add missing fields to `FollowUpVisit` model

```prisma
model FollowUpVisit {
  id                   String    @id @default(cuid())
  patientId            String
  visitNumber          Int // 1-14
  scheduledDate        DateTime
  actualDate           DateTime?
  visitType            String
  status               String

  // ✅ EXISTING: Clinical Status
  clinicalStatus       String?
  localRecurrence      Boolean?
  distantMetastasis    Boolean?
  metastasisSites      String?
  currentTreatment     String?
  mstsScoreId          String?
  karnofskyScore       Int?

  // ✅ EXISTING: Imaging & Labs
  imagingPerformed     String?
  imagingFindings      String?
  labResults           String?
  complications        String?

  // 🆕 NEW FIELDS (per document requirement):
  examinedBy           String?    // Dokter Pemeriksa (renamed from completedBy)
  chiefComplaint       String?    // Keluhan utama
  physicalExamination  String?    // Pemeriksaan Fisik
  supportingExamination String?   // Pemeriksaan Penunjang (consolidated description)

  // ✅ EXISTING: Other fields
  nextVisitDate        DateTime?
  notes                String?    // General notes
  createdAt            DateTime  @default(now())
  updatedAt            DateTime  @updatedAt

  patient Patient @relation(fields: [patientId], references: [id], onDelete: Cascade)

  @@unique([patientId, visitNumber])
  @@index([patientId])
  @@index([scheduledDate])
  @@index([status])
  @@map("follow_up_visits")
  @@schema("medical")
}
```

**Migration Steps**:
1. Create migration: `npx prisma migrate dev --name add_followup_required_fields`
2. Update DTOs to include new fields
3. Update service layer to handle new fields
4. Update frontend to use new fields

**Backward Compatibility**:
- Existing `notes` field preserved (for general notes)
- `completedBy` can be migrated to `examinedBy` via data migration script

---

### **Phase 3: FRONTEND UI ENHANCEMENT** 🎨

**File**: `/home/yopi/Projects/tumor-registry/frontend/src/components/patients/wizard/sections/Section9FollowUpManagement.tsx`

**Enhancement 1**: Add missing form fields per document

Insert after line 349 (Visit Date field):

```typescript
{/* Dokter Pemeriksa */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Dokter Pemeriksa <span className="text-red-500">*</span>
  </label>
  <input
    type="text"
    value={currentVisit.examinedBy || ''}
    onChange={(e) => updateVisit(currentVisit.visitNumber, { examinedBy: e.target.value })}
    placeholder="Nama dokter yang memeriksa..."
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
  />
</div>

{/* Keluhan (Chief Complaint) */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Keluhan (Chief Complaint)
  </label>
  <textarea
    value={currentVisit.chiefComplaint || ''}
    onChange={(e) => updateVisit(currentVisit.visitNumber, { chiefComplaint: e.target.value })}
    rows={3}
    placeholder="Keluhan utama pasien saat kunjungan..."
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
  />
</div>

{/* Pemeriksaan Fisik (Physical Examination) */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Pemeriksaan Fisik (Physical Examination)
  </label>
  <textarea
    value={currentVisit.physicalExamination || ''}
    onChange={(e) => updateVisit(currentVisit.visitNumber, { physicalExamination: e.target.value })}
    rows={4}
    placeholder="Hasil pemeriksaan fisik (inspeksi, palpasi, ROM, kekuatan otot, dll)..."
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
  />
</div>

{/* Pemeriksaan Penunjang (Supporting Examination) */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Pemeriksaan Penunjang (Supporting Examination)
  </label>
  <textarea
    value={currentVisit.supportingExamination || ''}
    onChange={(e) => updateVisit(currentVisit.visitNumber, { supportingExamination: e.target.value })}
    rows={4}
    placeholder="Ringkasan hasil imaging, lab, dan pemeriksaan penunjang lainnya..."
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
  />
  <p className="text-xs text-gray-500 mt-1">
    Field ini untuk ringkasan keseluruhan pemeriksaan penunjang.
    Detail imaging dan lab tetap dapat dicatat di field khusus di atas.
  </p>
</div>
```

**Enhancement 2**: Update TypeScript interface

Add to `FollowUpVisit` interface (around line 67):

```typescript
interface FollowUpVisit {
  visitNumber: number;
  scheduledMonth: number;
  visitDate?: string;
  completed: boolean;

  // 🆕 NEW FIELDS (per document)
  examinedBy?: string;              // Dokter Pemeriksa
  chiefComplaint?: string;          // Keluhan
  physicalExamination?: string;     // Pemeriksaan Fisik
  supportingExamination?: string;   // Pemeriksaan Penunjang

  // Existing fields...
  diseaseStatus?: 'NED' | 'LOCAL_RECURRENCE' | 'DISTANT_METASTASIS' | 'BOTH' | 'DECEASED';
  localRecurrence?: boolean;
  // ... rest of fields
}
```

---

### **Phase 4: BACKEND DTO UPDATE** 🔧

**File**: `/home/yopi/Projects/tumor-registry/backend/src/modules/musculoskeletal/follow-ups/dto/follow-up-visit.dto.ts`

**Add new optional fields**:

```typescript
export class FollowUpVisitDto {
  // ... existing fields ...

  @ApiPropertyOptional({ description: 'Dokter yang memeriksa' })
  examinedBy?: string;

  @ApiPropertyOptional({ description: 'Keluhan utama pasien' })
  chiefComplaint?: string;

  @ApiPropertyOptional({ description: 'Hasil pemeriksaan fisik' })
  physicalExamination?: string;

  @ApiPropertyOptional({ description: 'Ringkasan pemeriksaan penunjang' })
  supportingExamination?: string;
}

export class CreateFollowUpVisitDto {
  // ... existing required fields ...

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  examinedBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  chiefComplaint?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  physicalExamination?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  supportingExamination?: string;
}

export class UpdateFollowUpVisitDto {
  // ... existing fields ...

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  examinedBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  chiefComplaint?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  physicalExamination?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  supportingExamination?: string;
}
```

---

### **Phase 5: FOLLOWUP CALENDAR UPDATE** 📅

**File**: `/home/yopi/Projects/tumor-registry/frontend/src/components/musculoskeletal/FollowUpCalendar.tsx`

**Enhancement**: Display protocol info box with CORRECT months

Replace lines 316-342 (Protocol Info section):

```typescript
{/* Protocol Info */}
<div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
  <div className="flex">
    <svg
      className="h-6 w-6 text-purple-500 flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
    <div className="ml-3">
      <h4 className="text-sm font-semibold text-purple-800">
        Standard Follow-up Protocol (INAMSOS)
      </h4>
      <div className="text-sm text-purple-700 mt-2">
        <div className="mb-2">
          <strong>Year 1-2 (Every 3 months):</strong>
          <div className="ml-4 text-xs">
            Visit 1-8: 3, 6, 9, 12, 15, 18, 21, 24 months
          </div>
        </div>
        <div>
          <strong>Year 3-5 (Every 6 months):</strong>
          <div className="ml-4 text-xs">
            Visit 9-14: 30, 36, 42, 48, 54, 60 months
          </div>
        </div>
      </div>
      <p className="text-xs text-purple-600 mt-2 italic">
        Per dokumen: Indonesian Musculoskeletal Tumor Registry
      </p>
    </div>
  </div>
</div>
```

---

## 🧪 Testing Checklist

### **Unit Tests**
- [ ] Backend service generates correct 14-visit schedule (3,6,9,12,15,18,21,24,30,36,42,48,54,60)
- [ ] Frontend FOLLOW_UP_SCHEDULE matches backend calculation
- [ ] New fields (examinedBy, chiefComplaint, physicalExamination, supportingExamination) saved to DB

### **Integration Tests**
- [ ] Generate schedule API returns 14 visits with correct timing
- [ ] Create/Update visit with new fields persists data
- [ ] Frontend wizard saves Section9 data with all new fields

### **E2E Tests**
- [ ] Navigate to Section 9, verify 14 visits display with correct months
- [ ] Click Visit 5, verify form shows "15 months" label
- [ ] Fill all 6 document fields (Date, Doctor, Complaint, Physical Exam, Supporting Exam, MSTS)
- [ ] Submit and verify data saved correctly

---

## 📅 Implementation Timeline

### **Week 1 (URGENT)**
**Day 1-2**:
- ✅ Phase 1 (Frontend schedule fix) - **2 hours**
- ✅ Testing frontend schedule display

**Day 3-4**:
- ✅ Phase 2 (Database migration) - **4 hours**
- ✅ Phase 4 (Backend DTOs) - **2 hours**

**Day 5**:
- ✅ Phase 3 (Frontend UI enhancement) - **4 hours**
- ✅ Phase 5 (Calendar update) - **2 hours**

**Total Effort**: ~14 hours over 5 days

---

## 🚨 Risk Assessment

### **High Risk**
1. **Database Migration**: Existing data in `notes` field may contain Keluhan + other info mixed
   - **Mitigation**: Keep `notes` field, add new fields without breaking existing data

2. **Frontend-Backend Mismatch**: Users may have existing visits with WRONG months
   - **Mitigation**: Data migration script to recalculate `scheduledDate` for all existing visits

### **Medium Risk**
1. **UI/UX Confusion**: Users accustomed to old schedule may be confused
   - **Mitigation**: Add notification about schedule correction + documentation

### **Low Risk**
1. **MSTS Score linkage**: Ensure `mstsScoreId` properly links to MSTS Score table
   - **Mitigation**: Verify foreign key relationship in schema

---

## 📋 Data Migration Script (OPTIONAL)

If there are EXISTING follow-up visits with WRONG schedule, run this migration:

```typescript
// backend/src/scripts/fix-followup-schedule.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixFollowUpSchedule() {
  // Correct schedule: [3,6,9,12,15,18,21,24,30,36,42,48,54,60]
  const CORRECT_MONTHS = [3,6,9,12,15,18,21,24,30,36,42,48,54,60];

  const allVisits = await prisma.followUpVisit.findMany({
    include: { patient: true },
  });

  for (const visit of allVisits) {
    const correctMonth = CORRECT_MONTHS[visit.visitNumber - 1];

    // Find treatment completion date (you may need to adjust this)
    // Assuming we can reverse-calculate from first visit
    const firstVisit = await prisma.followUpVisit.findFirst({
      where: { patientId: visit.patientId, visitNumber: 1 },
    });

    if (!firstVisit) continue;

    // Calculate base date (treatment completion = 3 months before first visit)
    const baseDate = new Date(firstVisit.scheduledDate);
    baseDate.setMonth(baseDate.getMonth() - 3);

    // Calculate correct scheduled date
    const correctDate = new Date(baseDate);
    correctDate.setMonth(baseDate.getMonth() + correctMonth);

    // Update if different
    if (visit.scheduledDate.getTime() !== correctDate.getTime()) {
      await prisma.followUpVisit.update({
        where: { id: visit.id },
        data: { scheduledDate: correctDate },
      });

      console.log(`Fixed Visit ${visit.visitNumber} for Patient ${visit.patientId}`);
    }
  }

  console.log('Migration complete!');
}

fixFollowUpSchedule();
```

---

## ✅ Acceptance Criteria

### **MUST HAVE** (Blocker):
1. ✅ Frontend wizard displays correct months: 3,6,9,12,**15,18,21,24,30,36,42,48,54,60**
2. ✅ All 6 document fields available in UI: Date, Doctor, Complaint, Physical Exam, Supporting Exam, MSTS
3. ✅ Database schema includes new fields with proper migration
4. ✅ Backend DTOs updated to accept new fields
5. ✅ Follow-up Calendar shows correct protocol info

### **SHOULD HAVE** (Important):
1. ⚠️ Data migration script for existing wrong schedules
2. ⚠️ User notification about schedule correction
3. ⚠️ Documentation update in CLAUDE.md

### **NICE TO HAVE** (Optional):
1. 💡 Visual grouping in UI: Year 1-2 (green) vs Year 3-5 (blue)
2. 💡 Auto-suggest doctor names from user database
3. 💡 Template for common physical examination findings

---

## 📖 Documentation Updates Required

### **CLAUDE.md**
Add section about follow-up protocol compliance:

```markdown
## Follow-up Management - VERIFIED COMPLIANCE ✅

### 14-Visit Protocol (Per Official INAMSOS Document)
- **Year 1-2**: Every 3 months (8 visits at 3, 6, 9, 12, 15, 18, 21, 24 months)
- **Year 3-5**: Every 6 months (6 visits at 30, 36, 42, 48, 54, 60 months)

### Required Fields Per Visit (Per Document):
1. Tanggal (Date) - `actualDate`
2. Dokter Pemeriksa (Examining Doctor) - `examinedBy`
3. Keluhan (Complaints) - `chiefComplaint`
4. Pemeriksaan Fisik (Physical Examination) - `physicalExamination`
5. Pemeriksaan Penunjang (Supporting Examination) - `supportingExamination`
6. MSTS Score - `mstsScoreId`

### Implementation Status:
- ✅ Backend service timing: CORRECT
- ✅ Database schema: ENHANCED with all required fields
- ✅ Frontend wizard: CORRECTED schedule + all 6 fields
- ✅ Follow-up Calendar: UPDATED protocol info
```

---

## 🎯 Success Metrics

1. **Correctness**: 100% alignment with official document
2. **Data Completeness**: All 6 required fields captured for each visit
3. **User Experience**: Clear UI labels matching Indonesian medical terminology
4. **Backend Consistency**: Frontend schedule === Backend calculation
5. **No Regression**: Existing MSTS calculator, disease tracking, imaging/labs work as before

---

## 📞 Stakeholder Communication

### **For Medical Team:**
> "Kami telah memperbaiki protokol follow-up untuk sepenuhnya sesuai dengan dokumen resmi INAMSOS.
> Sekarang sistem tracking 14 kunjungan dengan jadwal: 3, 6, 9, 12, 15, 18, 21, 24, 30, 36, 42, 48, 54, 60 bulan.
> Semua 6 field yang diperlukan (Tanggal, Dokter Pemeriksa, Keluhan, Pemeriksaan Fisik, Pemeriksaan Penunjang, MSTS Score)
> sekarang tersedia di form input."

### **For Development Team:**
> "Critical bug fixed: Frontend follow-up schedule was misaligned with backend and official protocol.
> Phase 1 (schedule fix) is URGENT. Database migration required for new fields.
> Total effort: ~14 hours over 5 days."

---

## 🔗 Related Documents

- [x] Source Document: `/home/yopi/Downloads/Indonesian Musculoskeletal Tumor Registry (1).docx`
- [x] Current Implementation: `/home/yopi/Projects/tumor-registry/frontend/src/components/patients/wizard/sections/Section9FollowUpManagement.tsx`
- [x] Backend Service: `/home/yopi/Projects/tumor-registry/backend/src/modules/musculoskeletal/follow-ups/follow-ups.service.ts`
- [x] Database Schema: `/home/yopi/Projects/tumor-registry/backend/prisma/schema.prisma`
- [ ] Migration Script: `/home/yopi/Projects/tumor-registry/backend/src/scripts/fix-followup-schedule.ts` (TO BE CREATED)

---

**Prepared by**: Claude AI Assistant
**Review Status**: ⏳ PENDING USER APPROVAL
**Next Action**: User review → Approve → Implementation

---

_Silakan review rencana ini dengan teliti. Jika sudah cocok, saya akan langsung mulai implementasi Phase 1 (Frontend schedule fix) yang paling URGENT._
