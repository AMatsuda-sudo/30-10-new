import chalk from "chalk";
import readLine from "readline";

// import rl from readLine

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});


// readLine.question(`Qual a sua linguagem preferida: `,
//     (language) => {
//         if (language == 'javascript'){
//             console.log(`Excelente escolha!`); 
//         }
//         else {
//             console.log(`Que pena...`);
//         }
        
//     }
// );



rl.question(chalk.yellow(`Digite a sua primeira nota: `),
    (nota1) => {
        rl.question(chalk.yellow(`Digite sua segunda nota: `),
            (nota2) => {
                const media = (parseFloat(nota1) + parseFloat(nota2)) / 2;
                const nota = parseFloat(media);
                if (nota >=7) {
                    console.log(chalk.green(`Parabéns, sua média foi de ${media.toFixed(2)}`))
                }
                else {
                    console.log(chalk.red(`Que pena, sua média foi de ${media.toFixed(2)}`))
                }
                
                rl.close();
            }
        )
    }
)


