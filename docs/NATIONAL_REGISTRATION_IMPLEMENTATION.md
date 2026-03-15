# Implementasi Nomor Registrasi Nasional INAMSOS

## Ringkasan

Implementasi sistem nomor registrasi INAMSOS dengan format baru **CC-YY-NNNNN** (2 digit center, 2 digit tahun, 5 digit nomor urut nasional) dengan dukungan offline untuk aplikasi desktop.

## Format Nomor

### Format Nasional Final
```
CC-YY-NNNNN
Contoh: 01-25-00001, 15-25-00421, 99-25-99999
```

### Format Temporary (Offline Desktop)
```
CC-YY-T####T
Contoh: 01-25-T0001T, 15-25-T0421T
```

## Komponen yang Diubah

### 1. Database Schema (Prisma)

#### Model `Center`
```prisma
model Center {
  // ... existing fields ...
  
  // Legacy (backward compatibility)
  mrPrefix             String?  @unique @db.VarChar(3)
  mrSequenceCounter    Int      @default(0)
  mrSequenceYear       Int      @default(2025)
  
  // NEW: National Registration
  registrationCode     String?  @unique @db.VarChar(2)  // 01-99
  tempNumberPrefix     String?  @default("T") @db.VarChar(1)
}
```

#### Model `Patient`
```prisma
model Patient {
  // ... existing fields ...
  
  inamsosRecordNumber  String?  @unique  // NEW: CC-YY-NNNNN
  tempRecordNumber     String?  @unique  // NEW: CC-YY-T####T
  isTempNumber         Boolean  @default(false)
  numberAssignedAt     DateTime?
  numberAssignedBy     String?  // 'SERVER' or deviceId
}
```

#### Model Baru: `NationalRegistrationSequence`
```prisma
model NationalRegistrationSequence {
  id           String   @id @default(cuid())
  year         Int      @unique  // 2 digit (e.g., 25)
  lastSequence Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

#### Model Baru: `DesktopSequenceBlock`
```prisma
model DesktopSequenceBlock {
  id              String    @id @default(cuid())
  centerId        String
  deviceId        String    // Desktop identifier
  year            Int
  blockStart      Int       // Reserved block start
  blockEnd        Int       // Reserved block end
  currentSequence Int       @default(0)
  isActive        Boolean   @default(true)
  createdAt       DateTime  @default(now())
  expiresAt       DateTime?
  
  center          Center    @relation(fields: [centerId], references: [id])
  
  @@index([centerId, year])
  @@index([deviceId])
}
```

### 2. Backend Services

#### MedicalRecordService

**Method Baru:**
- `generateNationalRegistrationNumber(centerId, year?)` - Generate nomor nasional CC-YY-NNNNN
- `generateTemporaryNumber(centerId, deviceId, localSequence)` - Generate nomor temporary CC-YY-T####T
- `reserveSequenceBlock(centerId, deviceId, blockSize)` - Reserve block nomor untuk desktop
- `convertTemporaryToFinal(tempNumber, centerId)` - Convert temporary ke final saat sync
- `validateNationalFormat(recordNumber)` - Validasi format nasional
- `validateTemporaryFormat(tempNumber)` - Validasi format temporary

#### CentersService

**Update:**
- Validasi `registrationCode` (2 digit, 01-99, unik)
- Method `generateNextRegistrationCode()` - Generate kode berikutnya yang tersedia

#### OfflineQueueService

**Update:**
- Handle konversi temporary → final saat sync
- Tracking nomor yang sudah di-convert

### 3. API Endpoints

#### Offline Queue Endpoints (Baru)

```typescript
POST /api/offline-queue/registration/reserve-block
// Reserve sequence block untuk desktop
Body: { centerId: string, deviceId: string, blockSize?: number }
Response: { blockStart: number, blockEnd: number }

POST /api/offline-queue/registration/generate-temp
// Generate temporary number untuk desktop
Body: { centerId: string, deviceId: string, localSequence: number }
Response: { tempNumber: string }

POST /api/offline-queue/registration/convert
// Convert temporary ke final
Body: { tempNumber: string, centerId: string }
Response: { tempNumber: string, finalNumber: string }

GET /api/offline-queue/registration/current-sequence
// Get current national sequence
Query: { year?: number }
Response: { year: number, currentSequence: number }
```

### 4. Frontend Types

#### Center Interface
```typescript
interface Center {
  id: string;
  name: string;
  code: string;
  mrPrefix?: string | null;          // Legacy
  registrationCode?: string | null;  // NEW: 2-digit
  tempNumberPrefix?: string | null;  // NEW
  // ...
}
```

#### Patient Interface
```typescript
interface Patient {
  id: string;
  anonymousId: string;
  inamsosRecordNumber: string;       // NEW: CC-YY-NNNNN
  tempRecordNumber?: string;         // NEW: CC-YY-T####T
  isTempNumber?: boolean;            // NEW
  // ...
}
```

## Alur Kerja Offline-Online

### 1. Desktop Online (Normal Mode)
```
User Create Patient → Server Generate National Number → Return CC-YY-NNNNN
```

### 2. Desktop Offline
```
User Create Patient → Desktop Generate Temp Number → Simpan dengan CC-YY-T####T
```

### 3. Sync Process
```
Desktop Sync → Kirim data dengan tempNumber → 
Server Generate Final Number → Update patient → 
Return Mapping { temp: CC-YY-T####T, final: CC-YY-NNNNN } →
Desktop Update local DB
```

## Migration Database

### File Migration
`/backend/migrations/003_national_registration_number.sql`

### Langkah Migration:
1. Tambah kolom baru ke tabel `centers`
2. Buat tabel `national_registration_sequences`
3. Buat tabel `desktop_sequence_blocks`
4. Tambah kolom baru ke tabel `patients`
5. Assign `registrationCode` untuk center yang ada
6. Buat fungsi-fungsi helper (generate, validate)
7. Buat trigger auto-generate nomor

### Rollback:
Script rollback tersedia di bagian bawah file migration (commented).

## Kapasitas Sistem

| Format | Max Sequence | Max Patients/Year |
|--------|-------------|-------------------|
| CC-YY-NNNNN | 99,999 | 99,999 nasional |
| CC-YY-T####T | 9,999 | 9,999 per desktop (temporary) |

## Validasi Format

### National Format
```regex
/^\d{2}-\d{2}-\d{5}$/
// Contoh valid: 01-25-00001, 99-25-99999
```

### Temporary Format
```regex
/^\d{2}-\d{2}-T\d{4}T$/
// Contoh valid: 01-25-T0001T, 99-25-T9999T
```

### Registration Code
```regex
/^\d{2}$/
// Range: 01-99
```

## Desktop App Changes

Aplikasi desktop (Wails + Go) tidak perlu perubahan besar karena menggunakan backend lokal yang sama dengan server. Backend lokal akan menangani:

1. Generate temporary numbers saat offline
2. Sync dengan server saat online
3. Konversi temporary → final

## Testing Checklist

- [ ] Generate nomor nasional berhasil
- [ ] Generate nomor temporary berhasil
- [ ] Reserve sequence block berhasil
- [ ] Convert temporary ke final berhasil
- [ ] Sync patient dengan temporary number berhasil
- [ ] Validasi format national number
- [ ] Validasi format temporary number
- [ ] Validasi registration code
- [ ] Cek duplikat registration code
- [ ] Migration script berjalan lancar
- [ ] Rollback script berjalan lancar

## Catatan Penting

1. **Backward Compatibility**: Nomor lama (XXX-YYYY-NNNNN) tetap valid dan tidak di-migrate
2. **Offline Support**: Desktop tetap bisa bekerja offline dengan temporary numbers
3. **Thread Safety**: Generate nomor menggunakan database transaction dengan row locking
4. **Uniqueness**: Kombinasi UNIQUE constraint di database mencegah duplikat
5. **Monitoring**: Tabel `national_registration_sequences` memudahkan monitoring

## Troubleshooting

### Registration Code Already Exists
- Error: `Kode registrasi sudah digunakan oleh center lain`
- Solusi: Gunakan kode lain antara 01-99

### Center Registration Code Not Configured
- Error: `Center X does not have registrationCode configured`
- Solusi: Jalankan migration script atau set registrationCode manual

### Sequence Overflow
- Error: `Sequence exceeds maximum (99999)`
- Solusi: Extend ke 6 digit atau buat policy baru

## Kontak Support

Untuk pertanyaan atau masalah terkait implementasi ini:
- Email: support@inamsos.id
- Dokumentasi: `/docs/NATIONAL_REGISTRATION_IMPLEMENTATION.md`
