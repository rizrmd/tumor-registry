const { Client } = require('pg');

async function testConnection() {
    const configs = [
        { name: "No Password", connectionString: "postgresql://postgres@127.0.0.1:54321/postgres" },
        { name: "With Password 'postgres'", connectionString: "postgresql://postgres:postgres@127.0.0.1:54321/postgres" }
    ];

    for (const config of configs) {
        console.log(`Testing: ${config.name}...`);
        const client = new Client({ connectionString: config.connectionString, connectionTimeoutMillis: 2000 });
        try {
            await client.connect();
            console.log(`✅ SUCCESS: Connected with ${config.name}`);
            await client.end();
            return;
        } catch (err) {
            console.log(`❌ FAILED: ${err.message}`);
        }
    }
}

testConnection();
