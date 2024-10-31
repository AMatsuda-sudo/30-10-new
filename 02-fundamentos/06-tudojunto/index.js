const minimist = require('minimist');

const meu_modulo = require('./meuModulo.js');

const soma = meu_modulo.soma;

const args = minimist(process.argv.slice(2));
const a = args["a"];
const b = args["b"];

soma(a, b);

console.log(soma);



