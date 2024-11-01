import chalk from "chalk";
import readLine from "readline";


const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(chalk.bgWhite(`Digite o seu nome: `),
    (nome) => {
        rl.question(chalk.bgWhite(`Digite a sua idade: `),
            (idade) => {
                
                if (idade >=18) {
                    console.log(chalk.green(`${nome}, você é maior de idade! (${idade})`))
                }
                
                else {
                    console.log(chalk.red(`${nome}, você é menor de idade! (${idade})`))
                }
                
                rl.close();
            }
        )
    }
)


