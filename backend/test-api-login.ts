import axios from 'axios';

async function testLogin() {
  console.log('=== Testing Login API ===\n');

  try {
    // Test status endpoint (public)
    console.log('1. Testing /status endpoint...');
    try {
      const statusRes = await axios.get('http://127.0.0.1:3001/api/v1/status', { timeout: 5000 });
      console.log('✓ Status endpoint OK:', statusRes.data);
    } catch (e: any) {
      console.log('✗ Status endpoint failed:', e.message);
    }

    // Test login
    console.log('\n2. Testing /auth/login endpoint...');
    const loginRes = await axios.post('http://127.0.0.1:3001/api/v1/auth/login', {
      email: 'admin@inamsos.go.id',
      password: 'admin123'
    }, { timeout: 10000 });

    console.log('✓ Login successful!');
    console.log('  User:', loginRes.data.user.name);
    console.log('  Email:', loginRes.data.user.email);
    console.log('  Role:', loginRes.data.user.role);
    console.log('  Center ID:', loginRes.data.user.centerId);
    console.log('  Access Token:', loginRes.data.accessToken ? 'Present' : 'Missing');
    console.log('  Refresh Token:', loginRes.data.refreshToken ? 'Present' : 'Missing');

    // Test profile with token
    console.log('\n3. Testing /auth/profile endpoint with token...');
    const profileRes = await axios.get('http://127.0.0.1:3001/api/v1/auth/profile', {
      headers: {
        Authorization: `Bearer ${loginRes.data.accessToken}`
      },
      timeout: 10000
    });

    console.log('✓ Profile fetch successful!');
    console.log('  User:', profileRes.data.name);
    console.log('  Updated At:', profileRes.data.updatedAt);

    // Test patients endpoint
    console.log('\n4. Testing /patients endpoint...');
    const patientsRes = await axios.get('http://127.0.0.1:3001/api/v1/patients', {
      headers: {
        Authorization: `Bearer ${loginRes.data.accessToken}`
      },
      timeout: 10000
    });

    console.log('✓ Patients endpoint successful!');
    console.log('  Total patients:', patientsRes.data.meta?.total || patientsRes.data?.length || 0);

    // Test centers endpoint
    console.log('\n5. Testing /centers endpoint...');
    const centersRes = await axios.get('http://127.0.0.1:3001/api/v1/centers', {
      headers: {
        Authorization: `Bearer ${loginRes.data.accessToken}`
      },
      timeout: 10000
    });

    console.log('✓ Centers endpoint successful!');
    console.log('  Total centers:', centersRes.data.meta?.total || centersRes.data?.length || 0);

    console.log('\n=== All API Tests Passed ===');

  } catch (error: any) {
    console.error('\n✗ API Test Failed:');
    if (error.response) {
      console.error('  Status:', error.response.status);
      console.error('  Data:', error.response.data);
    } else if (error.request) {
      console.error('  Request failed - no response:', error.message);
    } else {
      console.error('  Error:', error.message);
    }
  }
}

testLogin();
