import { createServer } from "http";
const port = 3000;

const server = http.createServer((req, res) => {
    res.write('Hello world!! aqui estou mais um dia, sobre o olhar')
    res.end();
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});


