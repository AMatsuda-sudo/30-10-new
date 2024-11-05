const inquirer = require('inquirer');
const chalk = require('chalk');

const fs = require('fs');

console.log(chalk.bgGreen("Bem vindo ao Banco Senac!!"));

function operation() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'O que você deseja fazer?',
                choices: [
                    'Criar conta',
                    'Consultar saldo',
                    'Depositar',
                    'Sacar',
                    'Sair'
                ]
            }
        ])
        .then()
        .then((answers) => {            
            const action = answers['action'];
            if (action === 'Criar conta') {
                createAccount();
            }
            else if (action === 'Consultar saldo') {
                getAccountBalance();
            }
            else if (action === 'Depositar') {
                deposit();
            }
            else if (action === 'Sacar') {
                withdraw();
            }
            else if (action === 'Sair'){
                console.log(chalk.bgBlue('Obrigado por usar o Banco Senac!'))
                process.exit();
            }
        })
        .catch((err) => console.log(err));

}

function createAccount(){
    console.log(chalk.bgBlue('Criando conta...'));
    console.log(chalk.green("Defina as opções da sua conta a seguir:"));

    buildAccount();

    
}

function buildAccount(){
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Digite um nome para a sua conta:'
            }
        ])
        .then ((answers) => {
            console.info(answers['accountName'])
            const accountName = answers['accountName'];
            
            if(!fs.existsSync('accounts')) {
                fs.mkdirSync('accounts')
            }
            if(fs.existsSync(`accounts/${accountName}.json`))  {
                console.log(chalk.bgRed("Essa conta ja exite!!"))
            }
            fs.writeFileSync(
                `accounts/${accountName}.json`, 
                JSON.stringify({"balance": 0})
            );
            
            console.log(chalk.green("Parabéns, conta criada com sucesso!!"));
            operation();
        })
        .catch((err) => console.log(err));
            

}

function getAccountBalance(){
    console.log('Consultando saldo...');
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Digite o nome da sua conta:'
            }
        ])
        .then((answers) => {
            const accountName = answers['accountName'];
            if(!fs.existsSync(`accounts/${accountName}.json`)){
                console.log(chalk.bgRed('Esta conta não existe!'))
                operation();
                return;
            }
            const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
                encoding: 'utf8',
                flag: 'r'
            });
            const account = JSON.parse(accountJson);
            console.log(chalk.green(`Olá, ${accountName}, seu saldo é de R$${account.balance}`));
            operation();
        })
        .catch((err) => console.log(err));
}

function deposit(){
    console.log('Depositando...');
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Digite o nome da sua conta para depositar:'
        
            }
        ])
        .then((answers) => {
            const accountName = answers['accountName'];
            if(!fs.existsSync(`accounts/${accountName}.json`)){
                console.log(chalk.bgRed('Esta conta não existe!'))
                operation();
                return;
            }
            const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
                encoding: 'utf8',
                flag: 'r'
            });
            inquirer
            .prompt([
                {
                    name: 'accountName',
                    message: 'Digite o valor que deseja inserir na conta:'
            
                }
            ])
            .then((answers) => {
                const value = answers['value'];
                const account = JSON.parse(accountJson);
                account.balance = parseFloat(account.balance) + parseFloat(value);
                fs.writeFileSync(
                    `accounts/${accountName}.json`,
                    JSON.stringify(account)
                );
                console.log(chalk.green(`Olá, ${accountName}, você depositou R$${value}`));
                operation();
            })
            
            
        })
        .catch((err) => console.log(err))
        





}

function withdraw(){
    console.log('Sacando...');
}
operation();

    
