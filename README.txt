======================================================================
INAMSOS - Tumor Registry System (Desktop Edition) v1.3.5
======================================================================

SYSTEM REQUIREMENTS
-------------------
HARDWARE SPECIFICATIONS (MINIMUM):
- Processor (CPU): Intel Core i3 (Gen 6+) / AMD Ryzen 3 (or equivalent).
  (Minimum 2.0 GHz Dual Core recommended).
- Memory (RAM): 4GB Minimum (8GB Recommended for smoother performance).
- Storage: 1GB Free Disk Space.
- Display: 1366 x 768 Resolution (1920 x 1080 recommended).

SOFTWARE VERSIONS:

1. 64-bit Version (Recommended/Default):
   - Operating System: Windows 10 or Windows 11 (64-bit).
   - Dependencies: None (All components are bundled).
   - Installation: Run `Start-INAMSOS.bat`.

2. 32-bit Version (Manual Setup Required):
   - Operating System: Windows 7, 8, or 10 (32-bit).
   - REQUIREMENTS (Must be installed manually):
     * Node.js (32-bit version) - Must be in system PATH.
     * PostgreSQL (32-bit) or Remote Database connection.
   - Installation: 
     1. Install prerequisites above (Node 32-bit).
     2. Open `Start-INAMSOS.bat` with Notepad.
     3. Start "" "INAMSOS_64.exe"`
     4. Save and Run.

INSTALLATION & STARTUP
----------------------
1. Extract the folder `INAMSOS_App` to `C:\INAMSOS` or `D:\INAMSOS`.
   (Do NOT place in "Program Files" due to permission restrictions).

2. Run `Start-INAMSOS.bat` (Double-click).
   - Expected behavior: Launches `INAMSOS_64.exe` (Frontend interface).
   - If using 32-bit, ensure you followed the steps above.
     b) The Local Database (Port 54321).
     c) The Backend Service (Port 3001).
   - Wait for the "Database Online" message in the console.

3. Login:
   - Use your registered credentials.
   - For fresh installs, use Default Admin if provided by IT.

TROUBLESHOOTING
---------------
- If App doesn't open: Run `Start-INAMSOS.bat` as Administrator.
- If "Database Unavailable": Check firewall settings for port 54321.
- If Sync Fails: Check Internet Connection. Sync retries automatically.
- 32-bit Issues: Ensure you installed 32-bit Node.js and it is accessible via command prompt (`node -v`).

FOLDERS
-------
- data/      : Database files (Do NOT delete).
- backend/   : Application Logic.
- bin/       : Database Binaries.
- logs/      : Audit and Error logs.

CONTACT
-------
IT Support: support@inamsos.go.id
======================================================================
