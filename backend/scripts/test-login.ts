/**
 * Test Login untuk Semua User INAMSOS
 */

const BASE_URL = 'http://localhost:3001/api/v1';

const users = [
    { email: 'admin@inamsos.go.id', password: 'admin123', role: 'SYSTEM_ADMIN' },
    { email: 'national.admin@inamsos.go.id', password: 'admin123', role: 'NATIONAL_ADMIN' },
    { email: 'center.admin@inamsos.go.id', password: 'admin123', role: 'CENTER_ADMIN' },
    { email: 'researcher@inamsos.go.id', password: 'research123', role: 'RESEARCHER' },
    { email: 'medical.officer@inamsos.go.id', password: 'medical123', role: 'MEDICAL_OFFICER' },
    { email: 'head@inamsos.go.id', password: 'head123', role: 'HEAD_OF_CENTER' },
    { email: 'staff@inamsos.go.id', password: 'staff123', role: 'DATA_ENTRY' },
    { email: 'observer@inamsos.go.id', password: 'observer123', role: 'OBSERVER' },
];

async function testLogin(email: string, password: string) {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok && data.accessToken) {
            return { success: true, email, role: data.user?.role, name: data.user?.name };
        } else {
            return { success: false, email, error: data.error?.message || data.message || 'Unknown error' };
        }
    } catch (error: any) {
        return { success: false, email, error: error.message };
    }
}

async function main() {
    console.log('🧪 TEST LOGIN APLIKASI INAMSOS');
    console.log('='.repeat(70));
    console.log('');

    const results = [];

    for (const user of users) {
        const result = await testLogin(user.email, user.password);
        results.push(result);

        if (result.success) {
            console.log(`✅ ${user.email}`);
            console.log(`   Nama: ${result.name}`);
            console.log(`   Role: ${result.role}`);
            console.log(`   Status: LOGIN BERHASIL`);
        } else {
            console.log(`❌ ${user.email}`);
            console.log(`   Error: ${result.error}`);
            console.log(`   Status: LOGIN GAGAL`);
        }
        console.log('');
    }

    console.log('='.repeat(70));
    console.log('RINGKASAN TEST LOGIN');
    console.log('='.repeat(70));

    const passed = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log(`\n✅ Login Berhasil: ${passed}/${users.length}`);
    console.log(`❌ Login Gagal: ${failed}/${users.length}`);
    console.log(`📊 Success Rate: ${((passed / users.length) * 100).toFixed(1)}%`);

    if (failed > 0) {
        console.log('\n❌ User yang gagal login:');
        results.filter(r => !r.success).forEach(r => {
            console.log(`   - ${r.email}: ${r.error}`);
        });
    }

    console.log('\n' + '='.repeat(70));

    process.exit(failed > 0 ? 1 : 0);
}

main().catch(console.error);
