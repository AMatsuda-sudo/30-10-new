const http = require('http');
const fs = require('fs');

const port = 3000;
const server = http.createServer((req, res) => {
    fs.readFile('mensagem.html', 'utf-8', (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
})

console.log(`Servidor rodando na porta: ${port}`)