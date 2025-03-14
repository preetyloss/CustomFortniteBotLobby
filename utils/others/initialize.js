const nconf = require('nconf');
const config = require('../../client/config.json')
const initDarkDus = require('./darkdus/init')
const showInfo = require('../logs/showInfo')
require('dotenv').config();

nconf.argv().env().file({ file: 'config.json' });

const accountId = nconf.get('ACCOUNT_ID');
const deviceId = nconf.get('DEVICE_ID');
const secret = nconf.get('SECRET');

async function testDeviceAuth() {
    const missingFields = [];
    
    if (!accountId) missingFields.push('accountId');
    if (!deviceId) missingFields.push('deviceId');
    if (!secret) missingFields.push('secret');
    
    if (missingFields.length > 0) {
        return `Missing ${missingFields.join(' & ')}`;
    }
    return true
};


async function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

async function InitWelcomMessage() {
    console.clear();
    console.log('\x1b[36m%s\x1b[0m', `DarkDus : Fortnite Bot Lobby`);
    console.log('\x1b[36m%s\x1b[0m', '------------------------------------------------------');
    console.log('\x1b[36m%s\x1b[0m', 'Thank you for using DarkDus!');
    console.log('\x1b[36m%s\x1b[0m', 'DarkDus is a Fortnite lobby bot that is designed to help you manage your Fortnite Bot Lobby.');
    console.log('\x1b[36m%s\x1b[0m', 'DarkDus is a free and open-source project, and you are welcome to contribute to the project.');
    console.log('\x1b[36m%s\x1b[0m', `DarkDus version: ${config.DarkDus}`);
    console.log('\x1b[36m%s\x1b[0m', '------------------------------------------------------');
    console.log('\x1b[36m%s\x1b[0m', 'Please wait a moment while we load the bot...');

    if (nconf.get('DarkDus:skipVersionCheck') === false) {
        const initialized = await initDarkDus();
        if (!initialized) {
          await showInfo('DarkDus\'s version could not be verified..., always use the latest version of DarkDus!', 'red');
          await showInfo('You can download the latest version of DarkDus here: https://github.com/DarkDusOfficial/CustomFortniteBotLobby', 'red');
          await showInfo('Or disabled the version check in the config.json file (not recommanded) ', 'red');
          process.exit(1);
        }
    }
    
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
        console.clear();
        console.log('\x1b[36m%s\x1b[0m', '------------------------------------------------------');
        console.log('\x1b[31m%s\x1b[0m', resultTestDeviceAuth);
        console.log('\x1b[31m%s\x1b[0m', 'You can get Device Info by executing the command : \n node ./client/createDeviceAuth.js');
        console.log('\x1b[36m%s\x1b[0m', '------------------------------------------------------');
        process.exit(1);
    }
}

module.exports = InitWelcomMessage;