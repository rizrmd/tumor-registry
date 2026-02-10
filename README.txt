======================================================================
INAMSOS - Tumor Registry System (Desktop Edition) v4.0.0
======================================================================

INDONESIAN NATIONAL MUSCULOSKELETAL TUMOR REGISTRY
Enterprise Desktop Application - Optimized for Performance & Security

SYSTEM REQUIREMENTS
-------------------
HARDWARE SPECIFICATIONS:
- Processor (CPU): 64-bit Dual Core 2.0 GHz or higher.
- Memory (RAM): 4GB Minimum (8GB Recommended).
- Storage: 1GB Free Disk Space.
- Display: 1366 x 768 Resolution (1920 x 1080 recommended).

SOFTWARE SPECIFICATIONS:
- Operating System: Windows 10 or Windows 11 (64-bit only).
- Dependencies: Fully self-contained. No external installation required.

INSTALLATION & STARTUP
----------------------
1. PEMASANGAN:
   Ekstrak folder aplikasi ke lokasi permanen (Contoh: `D:\INAMSOS`).
   Hindari menaruh di folder "Program Files" untuk menghindari batasan izin (permissions).

2. MENJALANKAN APLIKASI:
   - Klik kanan pada `INAMSOS.exe` dan pilih "Run as Administrator" (opsional, direkomendasikan).
   - ATAU gunakan `Start-INAMSOS.bat` untuk menjalankan sekaligus mengecek update.

3. PROSES LOGIN (PENTING):
   - Aplikasi akan melakukan inisialisasi Database dan Server di latar belakang (tanpa jendela CMD).
   - Pada halaman Login, perhatikan indikator status di bawah judul:
     * "System Initializing... Please wait" (Kuning) -> Sistem sedang bersiap.
     * "System Ready" (Hijau) -> Sistem siap digunakan.
   - PASTIKAN status sudah HIJAU sebelum memasukkan username dan password.

FITUR UNGGULAN V4.0.0
---------------------
- SILENT STARTUP: Tidak ada jendela CMD hitam yang muncul saat aplikasi dibuka.
- BACKEND GUARDIAN: Sistem proteksi otomatis yang mencegah login jika database belum siap.
- STICKY NAVIGATION: Header dan menu tetap terkunci (freeze) saat Anda men-scroll data pasien yang panjang.
- SMART MERGE SYNC: Sinkronisasi cerdas yang mendeteksi revisi terbaru antara data lokal dan server pusat secara otomatis.
- DEEP CLEANUP: Struktur folder yang ringkas dan hanya berisi komponen yang esensial.

TROUBLESHOOTING
---------------
- Gagal Login (Network Error): Pastikan menunggu indikator status menjadi HIJAU (biasanya 10-20 detik setelah startup).
- Aplikasi Tidak Terbuka: Cek Task Manager, pastikan tidak ada proses `INAMSOS.exe` atau `postgres.exe` yang menyangkut dari sesi sebelumnya.
- Header Tidak Freeze: Pastikan resolusi layar Anda memenuhi standar minimal (1366x768).

STRUKTUR FOLDER
---------------
- bin/      : Mesin utama (Node.js & PostgreSQL). JANGAN DIHAPUS.
- data/     : Database lokal Anda. JANGAN DIHAPUS/DIMODIFIKASI.
- backend/  : Logika aplikasi (Distribusi Sistem).
- frontend/ : Antarmuka pengguna.
- scripts/  : Alat bantu pemeliharaan sistem.
- docs/     : Dokumentasi teknis tambahan.

KONTAK & DUKUNGAN
-----------------
Tim IT INAMSOS
Email: support@inamsos.go.id
Web: https://inamsos.medxamion.com
======================================================================
