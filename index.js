require('dotenv').config();
const nconf = require('nconf').argv().env().file({ file: './config/config.json' });
const express = require("express");
const { spawn } = require("child_process");
const WebhookClientWrapper = require('./utils/webhookClient');
const updatePlaylists = require('./structs/playlist-updater');
const initDarkDus = require('./structs/darkdus/init')
const showInfo = require('./utils/logs/showInfo')
const initClient = require('./utils/others/initialize');
const axios = require("axios");
const checkAPIStatus = require('./utils/others/checkAPI');
const app = express();
const port = nconf.get('system:port') || 8080
const isLocalhost = nconf.get('system:localhost_pages') === true

const initLocalhost = async () => {
  if (isLocalhost) {
    app.use(express.static('src')); 
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/src/index.html');
    });
    showInfo(`Localhost mode enabled: /src/index.html - You access to it (localhost:${port}/index.html)`, 'green');
  } else {
    showInfo(`Localhost mode disabled`)
  }
}

const sleep = async (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

const executeScript = async (scriptName, scriptArgs = []) => {
  const initialized = await initDarkDus();
  if (!initialized) {
    showInfo('[WARNING]: DarkDus\'s version could not be verified..., always use the latest version of DarkDus!', 'green');
  } else {
    showInfo('DarkDus successfully init', 'green')
  }
  const script = spawn("node", [scriptName, ...scriptArgs]);

  script.stdout.on("data", (data) => {
    if (data) {
      const logMessage = data.toString();
      if (logMessage.includes('[DISCORD]')) {
        console.log(logMessage); 
      } else {
        console.log(logMessage); 
      }
    }
  });

  script.stderr.on("data", (data) => {
    console.log(`Error --> ${data}`);
    process.exit(1);
  });

  script.on("close", (code) => {
    if (code === 0) {
      console.log(`Lobbybot finished with code ${code}`);
      process.exit(1);
    }
  });
};

async function start() {
  await initClient();
  
  let webhookClient;
  try {
    webhookClient = new WebhookClientWrapper();
    webhookClient.getStatus()
  } catch (error) {
    console.log('Error initializing webhook client: ', error);
  }

  updatePlaylists();
  checkAPIStatus()
  showInfo(`Server running on port ${port}`, 'green');
  await initLocalhost()
  executeScript("structs/lobbybot.js");
}

start();

app.listen(port, () => {});