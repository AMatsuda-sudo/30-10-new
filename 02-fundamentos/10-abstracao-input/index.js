// 

import inquirer from 'inquirer';


const questions = [
    {
        type: 'list',
        name: 'animais',
        message: 'Qual é o seu animal favorito ?',
        choices: ['Cachorro', 'Gato', 'Papagaio', 'Coelho', 'Elefante']
    },
];

inquirer.prompt(questions).then((answers) => {
    console.log(`Seu animal favorito é ${answers.animais}`);
})
.catch(error => {
    console.log(error);
})    


    