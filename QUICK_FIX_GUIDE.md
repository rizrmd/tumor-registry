# 🔧 Quick Fix Guide - INAMSOS Bug Fixes

## ⚡ Ringkasan Cepat

Ditemukan **2 bug utama** yang menyebabkan error pada aplikasi:

### Bug #1: Error "Gagal memuat data" ❌
**Lokasi**: Entry Data Baru → Pusat & Patologi  
**Penyebab**: Model database `PathologyType` belum dibuat  
**Status**: ✅ **SUDAH DIPERBAIKI** (perlu migration)

### Bug #2: Desktop App 404 Error ❌  
**Lokasi**: Desktop app (Wails) - semua halaman  
**Penyebab**: Frontend belum di-build untuk desktop app  
**Status**: ⚠️ **PERLU BUILD FRONTEND**

---

## 🚀 Langkah Perbaikan

### **STEP 1: Perbaiki Bug #1 (PathologyType Model)**

```bash
# 1. Masuk ke folder backend
cd backend

# 2. Install dependencies (jika belum)
npm install

# 3. Generate Prisma Client
npx prisma generate

# 4. Buat migration untuk PathologyType model
npx prisma migrate dev --name add_pathology_type_model

# 5. Jalankan seed untuk populate data
npm run db:seed
```

**Verifikasi Bug #1 Fixed:**
```bash
# Start backend
npm run start:dev

# Buka browser: http://localhost:3001/api/v1/pathology-types
# Harus return 3 pathology types:
# - bone_tumor
# - soft_tissue_tumor  
# - metastatic_bone_disease
```

---

### **STEP 2: Perbaiki Bug #2 (Desktop App 404)**

```bash
# 1. Build frontend Next.js
cd frontend
npm install
npm run build

# 2. Sync frontend ke desktop app
cd ..
node scripts/sync-frontend.js

# 3. Build desktop app
cd desktop
wails build
```

**Verifikasi Bug #2 Fixed:**
```bash
# Jalankan desktop app
./desktop/build/bin/INAMSOS.exe  # Windows
./desktop/build/bin/INAMSOS      # Linux/Mac

# Cek apakah halaman dashboard dan profile bisa diakses
```

---

## 📋 Checklist Perbaikan

### Bug #1 - PathologyType Model
- [ ] `npm install` di folder backend
- [ ] `npx prisma generate` berhasil
- [ ] `npx prisma migrate dev` berhasil
- [ ] `npm run db:seed` berhasil
- [ ] API endpoint `/api/v1/pathology-types` return 3 data
- [ ] Frontend form "Pusat & Patologi" bisa load dropdown

### Bug #2 - Desktop App
- [ ] `npm run build` di folder frontend berhasil
- [ ] Folder `frontend/out` atau `frontend/dist` sudah ada
- [ ] `node scripts/sync-frontend.js` berhasil
- [ ] `wails build` di folder desktop berhasil
- [ ] Desktop app bisa dibuka
- [ ] Halaman dashboard accessible
- [ ] Halaman profile accessible

---

## 🔍 Troubleshooting

### Problem: Prisma generate error "url is no longer supported"
**Solusi**: Gunakan Prisma versi 5.6.0 yang sudah ada di package.json
```bash
# Hapus global prisma jika ada
npm uninstall -g prisma

# Install local
npm install

# Generate dengan local prisma
npx prisma generate
```

### Problem: Frontend build error
**Solusi**: Pastikan semua dependencies terinstall
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Problem: Desktop app tidak bisa build
**Solusi**: Install Wails CLI
```bash
# Install Wails
go install github.com/wailsapp/wails/v2/cmd/wails@latest

# Verify installation
wails doctor

# Build
wails build
```

---

## 📊 Perubahan File

### File yang Dimodifikasi:
1. ✅ `backend/prisma/schema.prisma` - Tambah model PathologyType
2. ✅ `backend/prisma/seeds/pathology-types.seed.ts` - Seed data (sudah ada)

### File yang Dibuat:
1. ✅ `BUG_FIX_SUMMARY.md` - Dokumentasi lengkap bug fixes
2. ✅ `QUICK_FIX_GUIDE.md` - Panduan cepat ini

### File yang TIDAK Diubah:
- ✅ Semua fitur existing tetap sama
- ✅ Tidak ada breaking changes
- ✅ Cross-platform support tetap (Windows, Mac, Linux)

---

## ✅ Testing Setelah Fix

### Test Bug #1:
1. Buka aplikasi web: http://localhost:3000
2. Login dengan user test
3. Klik menu "Data Pasien" → "Entry Data Baru"
4. Klik section "Pusat & Patologi"
5. **Expected**: Dropdown "Jenis Patologi" muncul dengan 3 pilihan:
   - Tumor Tulang (Bone Tumor)
   - Tumor Jaringan Lunak (Soft Tissue Tumor)
   - Penyakit Tulang Metastatik (Metastatic Bone Disease)

### Test Bug #2:
1. Buka desktop app INAMSOS
2. Login dengan user test
3. Klik menu "Dashboard"
4. **Expected**: Dashboard page loads (bukan 404)
5. Klik menu "Profile"  
6. **Expected**: Profile page loads (bukan 404)

---

## 🎯 Hasil Akhir

Setelah semua langkah selesai:

✅ **Bug #1 Fixed**: Form entry pasien bisa load pathology types  
✅ **Bug #2 Fixed**: Desktop app bisa akses semua halaman  
✅ **Cross-platform**: Aplikasi tetap jalan di Windows, Mac, Linux  
✅ **No Breaking Changes**: Semua fitur existing tetap berfungsi

---

## 📞 Support

Jika masih ada masalah setelah mengikuti guide ini:

1. Check log error di terminal
2. Pastikan semua dependencies terinstall
3. Restart backend dan frontend
4. Rebuild desktop app

**Log Locations:**
- Backend: Terminal output dari `npm run start:dev`
- Frontend: Browser console (F12)
- Desktop: Terminal output dari desktop app

---

**Last Updated**: 2026-02-06  
**Version**: 1.0.0
