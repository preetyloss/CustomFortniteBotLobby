const { writeFile } = require('fs').promises;
const { Client } = require('fnbr');
const nconf = require('nconf');
const path = require('path');

async function init() {
    console.log('\x1b[36m%s\x1b[0m', '------------------------------------------------------');
    console.log('\x1b[36m%s\x1b[0m', 'Thank you for using DarkDus!');
    console.log('\x1b[36m%s\x1b[0m', 'DarkDus is a Fortnite lobby bot that is designed to help you manage your Fortnite Bot Lobby.');
    console.log('\x1b[36m%s\x1b[0m', 'DarkDus is a free and open-source project, and you are welcome to contribute to the project.');
    console.log('\x1b[36m%s\x1b[0m', `DarkDus version: ${nconf.get('DarkDus:version')}`);
    console.log('\x1b[36m%s\x1b[0m', '------------------------------------------------------');
    console.log('\x1b[36m%s\x1b[0m', 'Creating your device auth');
}

async function loading() {
  console.log('\x1b[36m%s\x1b[0m', '------------------------------------------------------');
  console.log('\x1b[36m%s\x1b[0m', 'Creating...');
  const totalSteps = 48;
  const delay = 100;
  let progress = '';

  for (let i = 0; i <= totalSteps; i++) {
      progress = '='.repeat(i) + ' '.repeat(totalSteps - i); 
      process.stdout.write(`\r[${progress}] ${(i / totalSteps * 100).toFixed(0)}%`);
      await new Promise(resolve => setTimeout(resolve, delay));
  }
}

async function showResult() {
  console.log('\x1b[36m%s\x1b[0m', '------------------------------------------------------');
  console.log('\x1b[36m%s\x1b[0m', 'Successfully created device auth!');
  console.log('\x1b[36m%s\x1b[0m', 'You can find your device auth in the temp folder (./client/temp/deviceAuth.json)');
  console.log('\x1b[36m%s\x1b[0m', '------------------------------------------------------');
}

(async () => {
  await init()
  const auth = { 
    authorizationCode: async () => Client.consoleQuestion('Please enter an authorization code: ') 
  };
  await loading()
  const client = new Client({ auth });
  client.on('deviceauth:created', (da) => writeFile('./temp/deviceAuth.json', JSON.stringify(da, null, 2)));
  await showResult()
})();
