const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Servidor Node.js funcionando');
});

server.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

if (port === 3000) {
    console.log('Puerto correcto');
}
