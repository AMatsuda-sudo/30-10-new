const express = require('express');
const app  = express();
const  port = 3000;
const  path = require('path');

const router = express.Router();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const basePath = path.join(__dirname, 'templates')

let checkAuth = (req, res, next) => {
   req.authStatus = true;
   if (req.authStatus) {
    console.log("Usuario autenticado");
       next();
   }

   else {
    console.log("Usuario nao autenticado");
   }
    
}

app.use(checkAuth);

app.get('/users/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`);
    console.log(req.authStatus);
});

app.post('/users/save', (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const age = req.body.age;
    console.log(`O nome do usuario e ${name} e a idade e ${age}`);
    res.sendFile(`${basePath}/users.html`);
});

app.get('/usersform', (req, res) => {
    res.sendFile(`${basePath}/userform.html`);
    console.log(req.authStatus);
});

app.get('/users/:id', (req, res) => {
    console.log(`Carregando usuário: ${req.params.id}`);
    res.sendFile(`${basePath}/users.html`);
});

app.get('/', (req, res) => {
    res.render(`${basePath}/index.html`);
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
});

module.exports = router;
