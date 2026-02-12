import axios from 'axios';

async function testComprehensive() {
  console.log('=== Comprehensive API Testing ===\n');

  let token = '';
  let userId = '';
  let centerId = '';

  try {
    // Login
    const loginRes = await axios.post('http://127.0.0.1:3001/api/v1/auth/login', {
      email: 'admin@inamsos.go.id',
      password: 'admin123'
    });
    token = loginRes.data.accessToken;
    userId = loginRes.data.user.id;
    centerId = loginRes.data.user.centerId;
    console.log('✓ Login successful');
    console.log(`  User: ${loginRes.data.user.name}`);
    console.log(`  Role: ${loginRes.data.user.role}`);
    console.log(`  Center ID: ${centerId}`);

    // Test endpoints
    const tests = [
      {
        name: 'Patients',
        url: '/patients',
        key: 'total',
        expected: 70
      },
      {
        name: 'Centers',
        url: '/centers',
        key: 'total',
        expected: 21
      },
      {
        name: 'Users',
        url: '/users',
        key: 'total',
        expected: 8
      },
      {
        name: 'Follow-ups',
        url: '/follow-ups',
        key: 'total',
        expected: null
      },
      {
        name: 'Pathology Types',
        url: '/pathology-types',
        key: 'total',
        expected: null
      },
      {
        name: 'Tumor Syndromes',
        url: '/tumor-syndromes',
        key: 'total',
        expected: null
      },
      {
        name: 'Bone Locations',
        url: '/locations/bone',
        key: 'total',
        expected: null
      },
      {
        name: 'Soft Tissue Locations',
        url: '/locations/soft-tissue',
        key: 'total',
        expected: null
      },
      {
        name: 'WHO Bone Classifications',
        url: '/who-classifications/bone',
        key: 'total',
        expected: null
      },
      {
        name: 'WHO Soft Tissue Classifications',
        url: '/who-classifications/soft-tissue',
        key: 'total',
        expected: null
      },
    ];

    let passed = 0;
    let failed = 0;

    for (const test of tests) {
      try {
        const res = await axios.get(`http://127.0.0.1:3001/api/v1${test.url}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const count = res.data[test.key] || res.data?.length || 0;
        const expectedStr = test.expected !== null ? ` (expected: ${test.expected})` : '';
        const status = test.expected === null || count === test.expected ? '✓' : '✗';
        const countStr = `${count}${expectedStr}`;

        if (status === '✓') {
          passed++;
          console.log(`  ${status} ${test.name}: ${countStr}`);
        } else {
          failed++;
          console.log(`  ${status} ${test.name}: ${countStr}`);
        }
      } catch (error: any) {
        failed++;
        console.log(`  ✗ ${test.name}: ${error.message}`);
      }
    }

    console.log(`\n=== Test Results ===`);
    console.log(`  Passed: ${passed}/${tests.length}`);
    console.log(`  Failed: ${failed}/${tests.length}`);

    // Test menu/dashboard data
    console.log(`\n=== Dashboard Data Test ===`);

    // Test national dashboard
    try {
      const dashboardRes = await axios.get('http://127.0.0.1:3001/api/v1/national-dashboard/statistics', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(`✓ National Dashboard Statistics`);
      console.log(`  Total Patients: ${dashboardRes.data.totalPatients}`);
      console.log(`  Active Patients: ${dashboardRes.data.activePatients}`);
    } catch (error: any) {
      console.log(`✗ National Dashboard Statistics: ${error.message}`);
    }

    // Test quality dashboard
    try {
      const qualityRes = await axios.get('http://127.0.0.1:3001/api/v1/quality/national/overview', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(`✓ Quality National Overview`);
      console.log(`  Total Patients: ${qualityRes.data.totalPatients}`);
    } catch (error: any) {
      console.log(`✗ Quality National Overview: ${error.message}`);
    }

    console.log(`\n=== All Tests Complete ===`);

  } catch (error: any) {
    console.error('\n✗ Login Error:', error.message);
  }
}

testComprehensive();
