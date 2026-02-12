import axios from 'axios';

async function testPatientsAPI() {
  console.log('=== Debugging Patients API ===\n');

  let token = '';

  try {
    // Login first
    const loginRes = await axios.post('http://127.0.0.1:3001/api/v1/auth/login', {
      email: 'admin@inamsos.go.id',
      password: 'admin123'
    });
    token = loginRes.data.accessToken;
    console.log('✓ Logged in as:', loginRes.data.user.name);
    console.log('  Role:', loginRes.data.user.role);
    console.log('  Center ID:', loginRes.data.user.centerId);

    // Test 1: Get patients with no parameters
    console.log('\n1. GET /patients (no params):');
    const res1 = await axios.get('http://127.0.0.1:3001/api/v1/patients', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(`   Total: ${res1.data.total || res1.data?.patients?.length || 0}`);
    console.log(`   Response keys:`, Object.keys(res1.data));

    // Test 2: Get patients with includeInactive=true
    console.log('\n2. GET /patients?includeInactive=true:');
    const res2 = await axios.get('http://127.0.0.1:3001/api/v1/patients?includeInactive=true', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(`   Total: ${res2.data.total || res2.data?.patients?.length || 0}`);

    // Test 3: Get patients with centerId
    console.log('\n3. GET /patients?centerId=' + loginRes.data.user.centerId + ':');
    const res3 = await axios.get('http://127.0.0.1:3001/api/v1/patients?centerId=' + loginRes.data.user.centerId, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(`   Total: ${res3.data.total || res3.data?.patients?.length || 0}`);

    // Test 4: Get patients with search
    console.log('\n4. GET /patients?search=P:');
    const res4 = await axios.get('http://127.0.0.1:3001/api/v1/patients?search=P', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(`   Total: ${res4.data.total || res4.data?.patients?.length || 0}`);

    // Test 5: Get patients with pagination
    console.log('\n5. GET /patients?page=1&limit=10:');
    const res5 = await axios.get('http://127.0.0.1:3001/api/v1/patients?page=1&limit=10', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(`   Total: ${res5.data.total || res5.data?.patients?.length || 0}`);
    if (res5.data.patients && res5.data.patients.length > 0) {
      console.log(`   First patient keys:`, Object.keys(res5.data.patients[0]));
    }

  } catch (error: any) {
    console.error('\n✗ Error:');
    if (error.response) {
      console.error('  Status:', error.response.status);
      console.error('  Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('  Message:', error.message);
    }
  }
}

testPatientsAPI();
