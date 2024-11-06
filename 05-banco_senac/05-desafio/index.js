const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');

console.log(chalk.bgGreen("Bem vindo ao Gerenciador de Tarefas!!"));

function operation() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer?',
            choices: [
                'Criar tarefa',
                'Ver tarefas',
                'Deletar tarefa',
                'Sair'
            ]
        }
    ])
    .then((answers) => {
        const action = answers['action'];
        if (action === 'Criar tarefa') {
            create();
        } else if (action === 'Ver tarefas') {
            see();
        } else if (action === 'Deletar tarefa') {
            deleteT();
        } else if (action === 'Sair') {
            console.log(chalk.bgBlue('Obrigado por usar o Gerenciador de tarefas!'));
            process.exit();
        }
    })
    .catch((err) => console.log(err));
}

function create() {
    inquirer.prompt([
        {
            name: 'description',
            message: 'Digite o título da tarefa:'
        }
    ])
    .then((answers) => {
        const tarefasC = answers['description'];

        if (!fs.existsSync('tasks')) {
            fs.mkdirSync('tasks');
        }
        if (fs.existsSync(`tasks/${tarefasC}.json`)) {
            console.log(chalk.bgRed("Essa tarefa já existe!!"));
            operation();
            return;
        }
        inquirer.prompt([
            {
                name: 'tarefa',
                message: 'Digite a descrição da tarefa:',
            }
        ])
        .then((answers) => {
            const tarefa = answers['tarefa'];

            fs.writeFileSync(
                `tasks/${tarefasC}.json`,
                JSON.stringify({ Tarefa: tarefa }),
                (err) => {
                    if (err) console.log(err);
                }
            );

            console.log(chalk.green("Parabéns, tarefa criada com sucesso!!"));
            operation();
        })
        .catch((err) => console.log(err)); // Corrigido aqui
    })
    .catch((err) => console.log(err));
}

function see() {
    const tarefas = fs.readdirSync('tasks');
    const tarefasSemExtensao = tarefas.map(tarefa => tarefa.replace('.json', ''));
    
    inquirer.prompt([
        {
            type: 'list',
            name: 'tarefa',
            message: 'Escolha uma tarefa:',
            choices: tarefasSemExtensao
        }
    ])
    .then((answers) => {
        const tarefaEscolhida = answers['tarefa'];
        const tarefaJson = fs.readFileSync(`tasks/${tarefaEscolhida}.json`, {
            encoding: 'utf-8',
            flag: 'r+'
        });
        
        const tarefa = JSON.parse(tarefaJson);
        console.log(chalk.green(`Sua tarefa é: ${tarefa.Tarefa}`));
        operation();
    })
    .catch((err) => console.log(err));
}

function deleteT() {
    const tarefas = fs.readdirSync('tasks');
    const tarefasSemExtensao = tarefas.map(tarefa => tarefa.replace('.json', ''));
    
    inquirer.prompt([
        {
            type: 'list',
            name: 'tarefa',
            message: 'Escolha uma tarefa:',
            choices: tarefasSemExtensao
        }
    ])
    .then((answers) => {
        const tarefaEscolhida = answers['tarefa'];
        fs.unlinkSync(`tasks/${tarefaEscolhida}.json`);
        console.log(chalk.green("Tarefa deletada com sucesso!!"));
        operation();
        })
        .catch((err) => console.log(err));
}



operation();
