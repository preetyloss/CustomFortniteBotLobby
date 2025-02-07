const { writeFile } = require('fs').promises;
const { Client } = require('fnbr');
const nconf = require('nconf');
const path = require('path');
const consoleQuestion = require('./consoleQuestion')
const config = nconf.env().file({ file: 'config.json' });

async function init() {
    console.log('\x1b[36m%s\x1b[0m', '------------------------------------------------------');
    console.log('\x1b[36m%s\x1b[0m', 'Thank you for using DarkDus!');
    console.log('\x1b[36m%s\x1b[0m', 'DarkDus is a Fortnite lobby bot that is designed to help you manage your Fortnite Bot Lobby.');
    console.log('\x1b[36m%s\x1b[0m', 'DarkDus is a free and open-source project, and you are welcome to contribute to the project.');
    console.log('\x1b[36m%s\x1b[0m', `DarkDus version: ${nconf.get('DarkDus:version')}`);
    console.log('\x1b[36m%s\x1b[0m', '------------------------------------------------------');
    console.log('\x1b[36m%s\x1b[0m', 'Creating your device auth');
}

async function createDeviceAuth(auth) {
    const client = new Client({ auth });

    client.on('deviceauth:created', async (da) => {
        await writeFile('./client/temp/deviceAuth.json', JSON.stringify(da, null, 2));
    });

    await client.login();
    process.exit(1);
}

async function loading() {
    console.log('\x1b[36m%s\x1b[0m', '------------------------------------------------------');
    console.log('\x1b[36m%s\x1b[0m', 'Creating...');
    const totalSteps = 48;
    const delay = 10;
    let progress = '';

    for (let i = 0; i <= totalSteps; i++) {
        progress = '='.repeat(i) + ' '.repeat(totalSteps - i); 
        process.stdout.write(`\r[${progress}] ${(i / totalSteps * 100).toFixed(0)}%`);
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    console.log();
}

async function showResult() {
    console.log('\x1b[36m%s\x1b[0m', '------------------------------------------------------');
    console.log('\x1b[36m%s\x1b[0m', 'Successfully created device auth!');
    console.log('\x1b[36m%s\x1b[0m', 'You can find your device auth in the temp folder (./client/temp/deviceAuth.json)');
    console.log('\x1b[36m%s\x1b[0m', '------------------------------------------------------');
}

(async () => {
    await init();
    
    const auth = { 
        authorizationCode: async () => await consoleQuestion('Please enter an authorization code: ') 
    };

    await createDeviceAuth(auth);
    await loading();
    await showResult();
})();
