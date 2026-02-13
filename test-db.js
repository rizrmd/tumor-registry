const { Client } = require('pg');
const client = new Client({
    connectionString: 'postgresql://postgres@127.0.0.1:54321/postgres?schema=system'
});

async function test() {
    try {
        console.log('Connecting to postgres...');
        await client.connect();
        console.log('Connected!');
        const res = await client.query('SELECT NOW()');
        console.log('Query result:', res.rows[0]);
        await client.end();
    } catch (err) {
        console.error('Connection error:', err);
    }
}

test();
