import inquirer from "inquirer";
import chalk from "chalk";

async function main() {
    try {
        const answers = await inquirer.prompt([
            {name: 'p1', message: (chalk.bgBlueBright.black('Qual a primeira nota? ') )},
            {name: 'p2', message: (chalk.bgBlueBright.black('Qual a segunda nota? ') )}
        ])
        console.log(answers);

        const media = (parseFloat(answers.p1) + parseFloat(answers.p2)) / 2;
        if (media >= 6) {
            console.log(`Parabéns, você foi aprovado!`);
            console.log(chalk.bgGreen(`Sua média é ${media.toFixed(2)}`));
        } else if (media >= 4 && media < 6) {
            console.log(`Você está de recuperação!`);
            console.log(chalk.bgYellow(`Sua média é ${media.toFixed(2)}`))
        } else {
            console.log(`Você foi reprovado!`);
            console.log(chalk.bgRed(`Sua média é ${media.toFixed(2)}`));
        }
    }
       catch (error) {
        console.log(error);
    }
    
}

main();
