const net = require('net');
const { Client } = require('pg');

const config = {
    host: '107.155.75.50',
    port: 5389,
    user: 'postgres',
    password: 'hltsXdfWOOGNkd32xsMbzp6bgBXPzPCiob6UEH0XL3qSt9OuqvEyhN0o3gZNSjuY',
    database: 'tmr-reg',
    ssl: false
};

console.log(`[Diagnostic] Testing TCP connection to ${config.host}:${config.port}...`);

const socket = new net.Socket();
socket.setTimeout(5000);

socket.on('connect', () => {
    console.log('[Diagnostic] TCP Connection Successful! Port is open.');
    socket.destroy();
    testPostgresConnection();
});

socket.on('timeout', () => {
    console.error('[Diagnostic] TCP Connection Timed Out. Firewall or network issue?');
    socket.destroy();
});

socket.on('error', (err) => {
    console.error('[Diagnostic] TCP Connection Error:', err.message);
    if (err.code === 'ECONNREFUSED') {
        console.error('  -> The server refused the connection. Is the database running on that port?');
    }
});

socket.connect(config.port, config.host);

async function testPostgresConnection() {
    console.log('[Diagnostic] Testing PostgreSQL Authentication...');
    const client = new Client(config);

    try {
        await client.connect();
        console.log('[Diagnostic] PostgreSQL Authentication Successful!');
        const res = await client.query('SELECT version()');
        console.log('  -> Server Version:', res.rows[0].version);
        await client.end();
    } catch (err) {
        console.error('[Diagnostic] PostgreSQL Error:', err.message);
        if (err.message.includes('password')) {
            console.error('  -> Invalid password or username.');
        } else if (err.message.includes('database')) {
            console.error('  -> Database name does not exist.');
        }
    }
}
