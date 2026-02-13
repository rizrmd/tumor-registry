
const http = require('http');

const data = JSON.stringify({
    email: 'admin@inamsos.go.id',
    password: 'password'
});

const options = {
    hostname: '127.0.0.1',
    port: 3001,
    path: '/api/v1/auth/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log(`BODY: ${body}`);
        process.exit(0);
    });
});

req.on('error', (e) => {
    console.error(`ERROR: ${e.message}`);
    process.exit(1);
});

req.write(data);
req.end();
