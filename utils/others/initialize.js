const testDeviceAuth = require('./testDeviceAuth');
const nconf = require('nconf');

nconf.argv().env().file({ file: 'config.json' });

async function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
     
const title = `
____             _    ____            
|  _ \  __ _ _ __| | _|  _ \ _   _ ___ 
| | | |/ _  |  __| |/ / | | | | | / __|
| |_| | (_| | |  |   <| |_| | |_| \__ \
|____/ \__,_|_|  |_|\_\____/ \__,_|___/
`

async function InitWelcomMessage() {
    console.clear();
    console.log('\x1b[36m%s\x1b[0m', title)
    console.log('\x1b[36m%s\x1b[0m', '------------------------------------------------------');
    console.log('\x1b[36m%s\x1b[0m', 'Thank you for using DarkDus!');
    console.log('\x1b[36m%s\x1b[0m', 'DarkDus is a Fortnite lobby bot that is designed to help you manage your Fortnite Bot Lobby.');
    console.log('\x1b[36m%s\x1b[0m', 'DarkDus is a free and open-source project, and you are welcome to contribute to the project.');
    console.log('\x1b[36m%s\x1b[0m', `DarkDus version: ${nconf.get('DarkDus:version')}`);
    console.log('\x1b[36m%s\x1b[0m', '------------------------------------------------------');
    console.log('\x1b[36m%s\x1b[0m', 'Please wait a moment while we load the bot...');

    const resultTestDeviceAuth = await testDeviceAuth();

    if (resultTestDeviceAuth === true) {
        const totalSteps = 48;
        const delay = 100;
        let progress = '';

        for (let i = 0; i <= totalSteps; i++) {
            progress = '='.repeat(i) + ' '.repeat(totalSteps - i); 
            process.stdout.write(`\r[${progress}] ${(i / totalSteps * 100).toFixed(0)}%`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        console.clear();
        console.log('\x1b[36m%s\x1b[0m', '------------------------------------------------------');
        console.log('\x1b[36m%s\x1b[0m', 'Bot loaded successfully!');
        console.log('\x1b[36m%s\x1b[0m', '------------------------------------------------------');
        await sleep(1);
        console.clear();
        console.log('\x1b[36m%s\x1b[0m', '------------------------------------------------------');
        console.log('\x1b[36m%s\x1b[0m', 'DarkDus : LOGS');
        console.log('\x1b[36m%s\x1b[0m', '------------------------------------------------------');
    } else {
        console.log('\x1b[36m%s\x1b[0m', '------------------------------------------------------');
        console.log('\x1b[31m%s\x1b[0m', resultTestDeviceAuth);
        console.log('\x1b[31m%s\x1b[0m', 'You can get Device Info by executing the command : \n node ./client/createDeviceAuth.js');
        console.log('\x1b[36m%s\x1b[0m', '------------------------------------------------------');
        process.exit(1);
    }
}

module.exports = InitWelcomMessage;