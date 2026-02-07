const axios = require('axios');

async function test() {
    const baseUrl = 'http://localhost:3001/api/v1';
    try {
        console.log('Testing /national-dashboard/statistics...');
        const res1 = await axios.get(`${baseUrl}/national-dashboard/statistics`);
        console.log('Statistics Status:', res1.status);

        console.log('Testing /national-dashboard/search-aggregated...');
        const res2 = await axios.post(`${baseUrl}/national-dashboard/search-aggregated`, {});
        console.log('Search Aggregated Status:', res2.status);

        console.log('All tests passed!');
    } catch (err) {
        console.error('Test failed:', err.response ? err.response.status : err.message);
        if (err.response) {
            console.error('Response data:', err.response.data);
        }
    }
}

test();
