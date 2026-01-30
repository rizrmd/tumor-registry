# 3 Level Akses Data - INAMSOS Registry
**Penjelasan Lengkap & Contoh Praktis**

---

## 🎯 Konsep Dasar

Sistem INAMSOS memiliki **3 tingkat akses data** yang berbeda untuk menjaga privasi pasien sambil tetap memungkinkan penelitian:

```
┌─────────────────────────────────────────────────────────────┐
│                    TINGKAT AKSES DATA                        │
├─────────────────────────────────────────────────────────────┤
│  Level 1: AGGREGATED     → Hanya statistik/ringkasan        │
│  Level 2: ANONYMIZED     → Data pasien tanpa identitas       │
│  Level 3: IDENTIFIABLE   → Data lengkap dengan identitas     │
└─────────────────────────────────────────────────────────────┘

Semakin tinggi level → Semakin ketat approval → Semakin detail data
```

---

## 📊 Level 1: AGGREGATED (Statistik Agregat)

### Definisi
Data dalam bentuk **ringkasan/statistik saja**, **TIDAK ada data pasien individual**.

### Data yang Diberikan
```json
{
  "totalPatients": 1234,
  "filters": {
    "province": "Jawa Timur",
    "cancerStage": "III",
    "ageRange": "40-60"
  },
  "breakdown": {
    "byGender": {
      "male": 678,
      "female": 556
    },
    "byTreatmentStatus": {
      "ongoing": 890,
      "completed": 244,
      "deceased": 100
    },
    "byPrimarySite": {
      "femur": 450,
      "tibia": 320,
      "humerus": 234,
      "other": 230
    }
  },
  "trends": [
    { "month": "2024-01", "newCases": 45 },
    { "month": "2024-02", "newCases": 52 },
    { "month": "2024-03", "newCases": 48 }
  ]
}
```

### ❌ TIDAK Ada:
- Nomor rekam medis
- ID pasien
- Tanggal lahir
- Alamat
- Data individual apapun

### ✅ Yang Ada:
- **COUNT** (jumlah)
- **PERCENTAGE** (persentase)
- **AVERAGE** (rata-rata)
- **TRENDS** (tren waktu)
- **DISTRIBUTION** (distribusi)

### Contoh Penggunaan

**Scenario 1: Analisis Epidemiologi Regional**
```
Peneliti: "Saya ingin tahu distribusi kasus tumor muskuloskeletal
          di Jawa Timur tahun 2024"

Data yang didapat:
- Total kasus: 456
- Distribusi per kota: Surabaya (234), Malang (112), Kediri (56), dll
- Distribusi per stadium: Stage I (45%), Stage II (30%), Stage III (18%), Stage IV (7%)
- Trend bulanan: Jan (32), Feb (38), Mar (45), Apr (41), ...

Yang TIDAK didapat:
- Siapa pasiennya
- Kapan pasien lahir
- Dimana alamat pasien
```

**Scenario 2: Perencanaan Kebijakan Kesehatan**
```
Dinas Kesehatan: "Berapa banyak pasien yang memerlukan kemoterapi
                  dan berapa yang memerlukan radiasi?"

Data yang didapat:
- Pasien dengan kemoterapi: 678 (54%)
- Pasien dengan radiasi: 432 (35%)
- Pasien dengan kombinasi: 234 (19%)
- Pasien dengan operasi saja: 145 (12%)

Yang TIDAK didapat:
- Detail treatment pasien individual
- Outcome masing-masing pasien
```

### Approval Process
```
┌─────────────────────────────────────────────────┐
│ AGGREGATED Access Request                       │
├─────────────────────────────────────────────────┤
│ Approval Level: ⭐ RENDAH                        │
│ Approver: CENTER_ADMIN atau NATIONAL_ADMIN      │
│ Justification: TIDAK wajib                      │
│ Ethics Approval: TIDAK wajib                    │
│ Processing Time: 1-3 hari                       │
└─────────────────────────────────────────────────┘

Karena tidak ada data identitas, approval relatif mudah.
```

---

## 🔒 Level 2: ANONYMIZED (Data Anonim)

### Definisi
Data **pasien individual** tapi **TANPA informasi yang bisa mengidentifikasi** pasien tersebut.

### Data yang Diberikan
```csv
recordId,ageAtDiagnosis,gender,province,primarySite,tumorStage,treatment,outcome,survivalMonths
ANO-001,45,male,Jawa Timur,femur,III,chemo+surgery,alive,24
ANO-002,62,female,Jawa Timur,tibia,II,surgery,alive,36
ANO-003,38,male,DKI Jakarta,humerus,IV,palliative,deceased,8
ANO-004,51,female,Jawa Barat,femur,III,chemo+radio,alive,18
...
```

### ❌ TIDAK Ada (Data Identitas):
- ~~Nama pasien~~
- ~~No. Rekam Medis INAMSOS~~ (diganti dengan ID random)
- ~~No. Rekam Medis Rumah Sakit~~
- ~~NIK~~
- ~~Tanggal lahir~~ (diganti dengan **usia saat diagnosis**)
- ~~Alamat lengkap~~ (hanya **provinsi**)
- ~~No. telepon~~
- ~~Email~~
- ~~Nama emergency contact~~

### ✅ Yang Ada (Data Medis):
- **ID Anonim Random** (ANO-001, ANO-002, ...)
- **Usia** (bukan tanggal lahir)
- **Gender**
- **Provinsi** (bukan alamat lengkap)
- **Diagnosis lengkap** (primary site, stage, grade, TNM)
- **Treatment history** (terapi yang diterima)
- **Lab results** (hasil patologi, radiologi)
- **Follow-up data** (kunjungan, MSTS scores)
- **Outcome** (survival, recurrence)
- **Durasi survival** (dalam bulan, bukan tanggal spesifik)

### Proses Anonimisasi

**BEFORE (Identifiable):**
```json
{
  "name": "Budi Santoso",
  "inamsosRecordNumber": "SBY-2024-00123",
  "hospitalRecordNumber": "12345678",
  "identityNumber": "3578012345670001",
  "dateOfBirth": "1978-05-15",
  "address": {
    "street": "Jl. Mawar No. 45",
    "village": "Kebonsari",
    "district": "Sukun",
    "city": "Malang",
    "province": "Jawa Timur"
  },
  "phone": "081234567890",
  "diagnosis": {
    "primarySite": "Femur",
    "stage": "III",
    "dateOfDiagnosis": "2024-03-15"
  }
}
```

**AFTER (Anonymized):**
```json
{
  "anonymousId": "ANO-478291",  // Random ID, not sequential
  "ageAtDiagnosis": 46,         // Calculated from DOB to diagnosis date
  "ageGroup": "40-50",          // Grouped age
  "gender": "male",
  "province": "Jawa Timur",     // Only province level
  "city": "Malang",             // Optional: city level (still not identifiable)
  "diagnosis": {
    "primarySite": "Femur",
    "stage": "III",
    "monthOfDiagnosis": "2024-03"  // Only month, not exact date
  }
}
```

### Contoh Penggunaan

**Scenario 1: Survival Analysis**
```
Peneliti: "Saya ingin melakukan analisis survival untuk osteosarcoma
          stadium III yang mendapat kemoterapi neoadjuvant"

Data yang didapat (sample):
| ID      | Age | Gender | Stage | Treatment        | Survival (months) | Status   |
|---------|-----|--------|-------|------------------|-------------------|----------|
| ANO-123 | 45  | M      | III   | Neo-chemo+Surg   | 36                | Alive    |
| ANO-234 | 52  | F      | III   | Neo-chemo+Surg   | 24                | Alive    |
| ANO-345 | 38  | M      | III   | Neo-chemo+Surg   | 12                | Deceased |
| ANO-456 | 61  | F      | III   | Surgery only     | 18                | Alive    |

Peneliti bisa:
✅ Hitung Kaplan-Meier survival curves
✅ Compare treatment outcomes
✅ Analisis faktor prognostik
✅ Publikasi hasil penelitian

Peneliti TIDAK bisa:
❌ Menghubungi pasien
❌ Mengidentifikasi pasien
❌ Link dengan data eksternal
```

**Scenario 2: Clinical Pattern Analysis**
```
Peneliti: "Apakah ada perbedaan outcome antara pasien yang mendapat
          limb salvage vs amputasi?"

Data yang didapat:
- 234 pasien dengan limb salvage
  → Avg survival: 42 months
  → Avg MSTS score: 24/30
  → Recurrence rate: 18%

- 156 pasien dengan amputasi
  → Avg survival: 38 months
  → Avg MSTS score: 18/30
  → Recurrence rate: 12%

Detail per pasien (anonymized):
| ID      | Surgery Type   | MSTS Score | Survival | Recurrence |
|---------|----------------|------------|----------|------------|
| ANO-789 | Limb Salvage   | 26         | 48       | No         |
| ANO-890 | Amputation     | 19         | 52       | No         |
```

### Approval Process
```
┌─────────────────────────────────────────────────┐
│ ANONYMIZED Access Request                       │
├─────────────────────────────────────────────────┤
│ Approval Level: ⭐⭐ MEDIUM                      │
│ Approver: NATIONAL_ADMIN (wajib)                │
│ Justification: Wajib (research protocol)        │
│ Ethics Approval: WAJIB (IRB/Komite Etik)        │
│ Processing Time: 7-14 hari                      │
│ Data Agreement: Wajib tanda tangan              │
└─────────────────────────────────────────────────┘

Paling umum untuk penelitian akademik yang akan dipublikasikan.
```

---

## 🔓 Level 3: IDENTIFIABLE (Data Lengkap)

### Definisi
Data **pasien individual** dengan **informasi identitas lengkap**.

### Data yang Diberikan
```csv
inamsosRecordNumber,name,dateOfBirth,identityNumber,phone,email,address,primarySite,stage,treatment,...
SBY-2024-00123,Budi Santoso,1978-05-15,3578012345670001,081234567890,budi@email.com,"Jl. Mawar 45, Malang",femur,III,chemo+surgery,...
SBY-2024-00124,Siti Rahma,1985-08-22,3578023456780002,081234567891,siti@email.com,"Jl. Melati 12, Surabaya",tibia,II,surgery,...
```

### ✅ SEMUA Data Tersedia:
- **Nama lengkap pasien** ⚠️
- **No. Rekam Medis INAMSOS** (SBY-2024-00123)
- **No. Rekam Medis Rumah Sakit**
- **NIK** (terenkripsi, bisa di-decrypt oleh peneliti authorized)
- **Tanggal lahir lengkap**
- **Alamat lengkap**
- **No. telepon**
- **Email**
- **Emergency contact**
- **Semua data medis lengkap**
- **Tanggal-tanggal spesifik** (diagnosis, treatment, follow-up)

### ⚠️ Risiko Privasi
Dengan data ini, peneliti BISA:
- Mengidentifikasi pasien secara langsung
- Menghubungi pasien
- Link dengan database eksternal
- Re-identifikasi

### Kapan Dibutuhkan?

#### Use Case 1: **Longitudinal Study dengan Patient Contact**
```
Peneliti: "Saya ingin melakukan quality of life study dengan
          wawancara langsung ke pasien post-treatment"

Butuh:
✅ Nama untuk komunikasi
✅ No. telepon untuk menghubungi
✅ Alamat untuk kunjungan
✅ Data medis untuk screening eligibility

Alasan tidak bisa pakai ANONYMIZED:
❌ Tidak bisa menghubungi pasien
❌ Tidak bisa konfirmasi consent langsung
```

#### Use Case 2: **Record Linkage Study**
```
Peneliti: "Saya ingin link data INAMSOS dengan data BPJS untuk
          analisis cost-effectiveness"

Butuh:
✅ NIK untuk matching dengan database BPJS
✅ Nama untuk validasi matching
✅ Tanggal lahir untuk cross-check

Alasan tidak bisa pakai ANONYMIZED:
❌ Tidak ada identifier untuk link data
```

#### Use Case 3: **Clinical Trial Recruitment**
```
Peneliti: "Saya sedang merekrut pasien untuk clinical trial
          obat baru osteosarcoma"

Butuh:
✅ Nama & kontak untuk recruitment
✅ Data medis lengkap untuk eligibility screening
✅ Tanggal diagnosis untuk inclusion criteria

Alasan tidak bisa pakai ANONYMIZED:
❌ Tidak bisa approach pasien untuk consent
```

#### Use Case 4: **Audit Medis Internal**
```
Hospital QA Team: "Kami ingin audit kualitas treatment di center kami
                   dan follow-up dengan dokter yang treating"

Butuh:
✅ Nama pasien untuk trace medical record lengkap
✅ Nama dokter yang merawat
✅ Timeline treatment lengkap

Alasan tidak bisa pakai ANONYMIZED:
❌ Perlu validasi dengan rekam medis fisik
```

### Approval Process
```
┌─────────────────────────────────────────────────┐
│ IDENTIFIABLE Access Request                     │
├─────────────────────────────────────────────────┤
│ Approval Level: ⭐⭐⭐ SANGAT KETAT               │
│ Approver: NATIONAL_ADMIN + Review Committee     │
│ Justification: WAJIB & SANGAT DETAIL            │
│ Ethics Approval: WAJIB (IRB dengan patient consent) │
│ Data Protection Plan: WAJIB                     │
│ Processing Time: 14-30 hari                     │
│ Data Agreement: Lengkap + penalty clause        │
│ Monitoring: Regular audit & compliance check    │
│ Access Duration: LIMITED (usually 6-12 months)  │
└─────────────────────────────────────────────────┘

Hanya untuk penelitian dengan justifikasi yang SANGAT kuat
dimana data anonim benar-benar tidak cukup.
```

### Syarat Tambahan untuk IDENTIFIABLE Access

1. **Informed Consent dari Pasien**
   - Wajib ada consent form yang ditandatangani pasien
   - Pasien harus tahu data mereka akan digunakan untuk penelitian

2. **Data Security Plan**
   - Enkripsi data saat transfer
   - Storage yang aman (encrypted)
   - Access control yang ketat
   - Audit log semua akses

3. **Data Destruction Plan**
   - Kapan data akan dihapus setelah penelitian selesai
   - Bagaimana cara menghapus data

4. **Legal Agreement**
   - Peneliti tanda tangan agreement dengan penalty
   - Tidak boleh share data ke pihak ketiga
   - Hanya untuk tujuan penelitian yang disetujui

---

## 📊 Perbandingan Level Akses

| Aspek | AGGREGATED | ANONYMIZED | IDENTIFIABLE |
|-------|------------|------------|--------------|
| **Data Pasien Individual** | ❌ Tidak ada | ✅ Ada (tanpa identitas) | ✅ Ada (dengan identitas) |
| **Bisa Publikasi Jurnal** | ⚠️ Terbatas | ✅ Ya | ✅ Ya (dengan consent) |
| **Bisa Hubungi Pasien** | ❌ Tidak | ❌ Tidak | ✅ Ya |
| **Approval Ketat** | ⭐ Rendah | ⭐⭐ Medium | ⭐⭐⭐ Sangat Ketat |
| **Ethics Approval Wajib** | ❌ Tidak | ✅ Ya | ✅ Ya + Consent |
| **Processing Time** | 1-3 hari | 7-14 hari | 14-30 hari |
| **Monitoring** | ❌ Tidak perlu | ⚠️ Minimal | ✅ Regular audit |
| **Access Duration** | Unlimited | 12-24 bulan | 6-12 bulan |
| **Typical Use Case** | Epidemiologi, Kebijakan | Analisis klinis, Publikasi | Clinical trial, Longitudinal study |

---

## 🎯 Decision Tree: Level Mana yang Harus Saya Pilih?

```
┌─────────────────────────────────────────────────────────────┐
│  Apakah Anda perlu MENGHUBUNGI PASIEN?                      │
└─────────────────────────────────────────────────────────────┘
         │
         ├─── Ya ──────────────────────────────► IDENTIFIABLE
         │                                       (Level 3)
         │
         └─── Tidak
                │
                ├─────────────────────────────────────────────┐
                │  Apakah Anda perlu data PASIEN INDIVIDUAL?  │
                └─────────────────────────────────────────────┘
                         │
                         ├─── Ya ──────────────► ANONYMIZED
                         │                       (Level 2)
                         │
                         └─── Tidak ───────────► AGGREGATED
                                                 (Level 1)
```

### Contoh Skenario

**Q: "Saya ingin tahu berapa pasien osteosarcoma di Indonesia tahun 2024?"**
→ **AGGREGATED** (cukup statistik)

**Q: "Saya ingin analisis faktor prognostik osteosarcoma dengan regresi Cox?"**
→ **ANONYMIZED** (perlu data individual tapi tidak perlu identitas)

**Q: "Saya ingin wawancara pasien survivor 5 tahun untuk quality of life study?"**
→ **IDENTIFIABLE** (perlu hubungi pasien)

---

## 🛡️ Proteksi Data per Level

### AGGREGATED
```
Proteksi: ████████████████████ 100%
Risk: MINIMAL (tidak ada data individual)
Compliance: ✅ Otomatis GDPR/HIPAA compliant
```

### ANONYMIZED
```
Proteksi: ████████████████░░░░ 80%
Risk: LOW (masih ada small risk re-identification)
Compliance: ✅ GDPR/HIPAA compliant dengan proper de-identification
Catatan: Kombinasi beberapa field bisa re-identify pasien (misal: penyakit langka + provinsi kecil + usia spesifik)
```

### IDENTIFIABLE
```
Proteksi: ████░░░░░░░░░░░░░░░░ 20%
Risk: HIGH (data bisa disalahgunakan)
Compliance: ⚠️ Butuh informed consent, data agreement, security measures
Catatan: Paling berisiko, butuh monitoring ketat
```

---

## 📝 Template Request untuk Masing-Masing Level

### Template 1: AGGREGATED Request
```
Title: Analisis Distribusi Kasus Tumor Muskuloskeletal Nasional 2024

Objective:
Mengetahui distribusi geografis dan demografis kasus tumor muskuloskeletal
di Indonesia untuk perencanaan kebijakan kesehatan.

Data Requested:
- Total kasus per provinsi
- Distribusi per stadium
- Distribusi per jenis tumor
- Trend bulanan 2024

Use Case:
Laporan tahunan Kementerian Kesehatan untuk alokasi budget terapi kanker.

Justification:
Data agregat cukup untuk analisis kebijakan, tidak memerlukan data individual.

Expected Approval: 1-3 hari
```

### Template 2: ANONYMIZED Request
```
Title: Survival Analysis Osteosarcoma Post-Neoadjuvant Chemotherapy

Objective:
Menganalisis faktor prognostik yang mempengaruhi survival pasien osteosarcoma
yang mendapat kemoterapi neoadjuvant.

Data Requested:
- Demographics (age, gender, province)
- Tumor characteristics (site, stage, grade, size)
- Treatment details (chemo protocol, surgery type)
- Follow-up data (survival time, recurrence, MSTS scores)

Sample Size: ~200-300 patients

Use Case:
Penelitian akademik untuk tesis S2 Ilmu Bedah Ortopedi.
Hasil akan dipublikasikan di jurnal internasional.

Ethics Approval:
Approved by Komite Etik Penelitian FK Universitas X
No: 123/KEP/2025

Justification:
Perlu data individual untuk analisis survival dan regresi multivariat.
Data anonim cukup karena tidak perlu follow-up langsung pasien.

Expected Approval: 7-14 hari
```

### Template 3: IDENTIFIABLE Request
```
Title: Quality of Life Assessment in Long-term Survivors of Limb Salvage Surgery

Objective:
Mengevaluasi quality of life pasien survivor >5 tahun post limb salvage surgery
melalui wawancara langsung dan pemeriksaan fisik.

Data Requested:
- Full patient demographics (name, contact, address)
- Complete medical history
- Treatment details
- Follow-up records

Sample Size: 50-100 patients

Use Case:
Penelitian disertasi S3 dengan metodologi mixed-methods (kuantitatif + kualitatif).
Memerlukan wawancara mendalam dan pemeriksaan fisik ulang pasien.

Why IDENTIFIABLE Access is ESSENTIAL:
1. Need to contact patients directly for consent & scheduling
2. Need to conduct in-person interviews
3. Need to perform physical examination and MSTS assessment
4. ANONYMIZED data is insufficient because we cannot reach patients

Ethics Approval:
Approved by Komite Etik Penelitian FK Universitas X
No: 456/KEP/2025
Patient Informed Consent: Included in protocol

Data Protection Plan:
- Data stored in encrypted laptop
- Password-protected files
- No sharing with third parties
- Data destruction 6 months post-publication

Legal Agreement:
Willing to sign data use agreement with penalty clause.

Expected Approval: 14-30 hari
```

---

## ⚖️ Regulasi & Compliance

### Indonesia - UU Perlindungan Data Pribadi
```
AGGREGATED:   ✅ Compliant (bukan data pribadi)
ANONYMIZED:   ✅ Compliant (pseudonymized/de-identified)
IDENTIFIABLE: ⚠️ Butuh consent & legitimate purpose
```

### GDPR (European Union)
```
AGGREGATED:   ✅ Not personal data
ANONYMIZED:   ✅ Compliant if properly anonymized
IDENTIFIABLE: ⚠️ Needs consent + data protection measures
```

### HIPAA (USA)
```
AGGREGATED:   ✅ Not PHI (Protected Health Information)
ANONYMIZED:   ✅ De-identified data (Safe Harbor method)
IDENTIFIABLE: ⚠️ Needs authorization + business associate agreement
```

---

## 🎓 Best Practices

### Untuk Researcher
1. **Mulai dari level terendah** yang bisa menjawab research question Anda
2. **Upgrade hanya jika BENAR-BENAR perlu** - Justify clearly
3. **Transparansi** tentang bagaimana data akan digunakan
4. **Follow data agreement** - Jangan share data ke pihak lain

### Untuk National Admin (Approver)
1. **Default to ANONYMIZED** kecuali ada justifikasi kuat untuk IDENTIFIABLE
2. **Challenge the request** - Tanya "apakah anonymized cukup?"
3. **Monitor compliance** - Audit penggunaan data
4. **Educate researchers** - Berikan guidance

### Untuk Center Admin
1. **Pastikan informed consent** untuk IDENTIFIABLE access
2. **Audit log** siapa mengakses data pasien Anda
3. **Report violations** jika ada penyalahgunaan

---

## ❓ FAQ

**Q: Apakah saya bisa upgrade dari ANONYMIZED ke IDENTIFIABLE nanti?**
A: Ya, tapi harus submit request baru dengan justifikasi mengapa upgrade diperlukan.

**Q: Berapa lama data bisa saya pakai?**
A:
- AGGREGATED: No limit
- ANONYMIZED: 12-24 bulan (renewable)
- IDENTIFIABLE: 6-12 bulan (strictly monitored)

**Q: Apakah saya bisa share data ke co-researcher?**
A:
- AGGREGATED: Yes (sudah public)
- ANONYMIZED: Hanya jika mereka listed di research protocol
- IDENTIFIABLE: NO, strictly personal access unless re-approved

**Q: Apakah data ANONYMIZED benar-benar tidak bisa di-identify?**
A: Ada small risk re-identification jika kombinasi unique attributes (rare disease + small province + specific age). Best practice: aggregate rare values.

**Q: Saya cuma butuh 10 pasien untuk case series, level apa?**
A: Case series biasanya IDENTIFIABLE karena jumlah kecil = risiko identifikasi tinggi + biasanya perlu detail klinis lengkap.

---

## 📞 Kontak

Untuk pertanyaan lebih lanjut tentang data access levels:
- **Email:** data-access@inamsos.id
- **Helpdesk:** support@inamsos.id

---

**Last Updated:** 28 Desember 2025
**Version:** 1.0
