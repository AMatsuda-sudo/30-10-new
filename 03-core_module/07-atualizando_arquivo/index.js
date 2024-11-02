
const http = require("http");
const fs = require("fs");
const url = require("url");

const port = 3000;

const server = http.createServer((req, res) => {
    const urlInfo = require("url").parse(req.url, true);
    const name = urlInfo.query.name;
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");

    if (!name) {
        fs.readFile("index.html", function (err, data) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            return res.end();
        });
    } else {
        const newLine = name  + "\r\n";
        fs.appendFile("arquivo.txt", newLine, function (err, data) {
            res.writeHead(302, {
                location: "/"
            })
            return res.end();
        })
            
    }
});

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});