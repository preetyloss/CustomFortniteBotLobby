require('dotenv').config();
const nconf = require('nconf').argv().env().file({ file: './config/config.json' });
const express = require("express");
const { spawn } = require("child_process");
const WebhookClientWrapper = require('./utils/webhookClient');
const updatePlaylists = require('./structs/playlist-updater');
const axios = require("axios");

const app = express();
const port = 8080;

let webhookClient;
try {
  webhookClient = new WebhookClientWrapper();  
} catch (error) {
  console.log('Error initializing webhook client: ', error);
  process.exit(1);  
}

updatePlaylists();

const executeScript = (scriptName, scriptArgs = []) => {
  const script = spawn("node", [scriptName, ...scriptArgs]);

  script.stdout.on("data", (data) => {
    const logMessage = data.toString();
    if (logMessage.includes('[DISCORD]')) {
      console.log(logMessage); 
    } else {
      console.log(logMessage); 
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

executeScript("structs/lobbybot.js");

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
