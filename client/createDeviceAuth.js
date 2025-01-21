const { writeFile } = require('fs').promises;
const { Client } = require('fnbr');

(async () => {
  const auth = { 
    authorizationCode: async () => Client.consoleQuestion('Please enter an authorization code: ') 
  };

  const client = new Client({ auth });
  client.on('deviceauth:created', (da) => writeFile('../deviceAuth.json', JSON.stringify(da, null, 2)));
})();
