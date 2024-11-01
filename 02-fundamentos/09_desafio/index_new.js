import chalk from "chalk"
import  Readline  from "readline"

const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question(chalk.hex('#A020F0')(`Digite o seu nome: `),
    (nome) => {
        rl.question(chalk.bgWhite(`Digite a sua idade: `),
            (idade) => {
                 console.log(chalk.bgBlue(`Olá ${nome}, você tem ${idade} anos.`))
                   
                rl.close()
            }
        )
    }
)

