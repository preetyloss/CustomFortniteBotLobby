const readline = require('readline');

async function consoleQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(`\x1b[36m${query}\x1b[0m `, ans => {
        rl.close();
        resolve(ans);
    }));
}

module.exports = consoleQuestion;