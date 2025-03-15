const { 
  bot_invite_status, cid, bot_invite_onlinetype, bot_use_status, bot_use_onlinetype, bot_join_message, bot_leave_time, eid, reload_time, reload, xmpp_Debug
} = require('./config');
const axiosInstance = require('axios').default;
const system = require('os');
const { Client: botClientClass, ClientOptions, Enums, Party } = require('fnbr');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError')
const initClient = require('../client/initClient');
const initUsername = require('../utils/others/darkdus/initUsername')
const { allowedPlaylists, websocketHeaders } = require('../utils/constants');
const WebhookClientWrapper = require('../utils/webhookClient');
const webhookClient = new WebhookClientWrapper();
require('colors');
const fetchVersion = require('../utils/version');
const handleCommands = require('../events/handleCommands')
const handlePartyUpdated = require('../events/partyUpdated');
const handlePartyMemberUpdated = require('../events/partyMemberUpdated');
const handleFriendRequest = require('../events/friendRequest');
const handlePartyInvite = require('../events/partyInvite');
const handlePartyJoinRequest = require('../events/partyJoinRequest');
const handlePartyMemberJoined = require('../events/partyMemberJoined');
const handlePartyMemberLeft = require('../events/partyMemberLeft');
const managePartySize = require('../events/managePartySize');
const reconnectClient = require('../events/reconnectClient');
const initializeDiscordBot = require('../discordBot/index');
const postStatus = require('../client/postStatus')
const handleExit = require('../events/handleExit')
const handleDisconnected = require('../events/disconnected');
const handleFriendUpdated = require('../events/friendUpdated')
const handleMemberKicked = require('../events/handleMemberKicked')
const handleMemberPromoted = require('../events/handleMemberPromoted')
const logEnabled = true;
let timerstatus = false;
let userData
let data

/**
 * @typedef {import('./utils/types').MMSTicket} MMSTicket
 * @typedef {import('./utils/types').PartyMatchmakingInfo} PartyMatchmakingInfo
 */

function cloneData(data) {
  return { ...data };
}

async function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

(async () => {
  const currentVersion = await fetchVersion();
  const platformType = system.platform() === "win32" ? "Windows" : system.platform();
  const userAgentString = `Fortnite/${currentVersion.replace('-Windows', '')} ${platformType}/${system.release()}`;

  axiosInstance.defaults.headers["user-agent"] = userAgentString;
  let message = "UserAgent set to" + axiosInstance.defaults.headers["user-agent"]
  showInfo(message, 'sysMessage');

  const accountId = process.env.ACCOUNT_ID;
  const deviceId = process.env.DEVICE_ID;
  const secret = process.env.SECRET;

  if (!accountId || !deviceId || !secret) {
    showError("Account information (ACCOUNT_ID, DEVICE_ID, SECRET) is missing or incomplete.");
    showError('If you haven\'t bot information yet, you can get it with the command : node ./client/createDeviceAuth.js')
    process.exit(1);
  }

  const botClient = new botClientClass({
    defaultStatus: "Launching Kali Linux...",
    auth: {
      deviceAuth: {
        accountId,
        deviceId,
        secret,
      },
    },
    debug: console.log,
    xmppDebug: xmpp_Debug || false,
    platform: 'WIN',
    partyConfig: {
      chatEnabled: true,
      maxSize: 4,
    },
  });

  global.botClient = botClient;
  botClient.setMaxListeners(20);
  await botClient.login();
  showInfo(`Logged in as ${botClient.user.self.displayName}`, 'clientInfo');
  await initUsername(botClient.user.self.displayName)
  const partyInstance = botClient.party;
  await initClient(botClient);
  await partyInstance.setPrivacy(Enums.PartyPrivacy.PRIVATE);

  const friendsList = Array.from(botClient.friend.list.values());
  const friendNames = friendsList.map(friend => friend._displayName);

  data = {
      username: botClient.user.self.displayName,
      id: botClient.user.self.id,
      status: "Online",
      friends: friendNames.length,
      party: "alone",
      matchmaking: "available",
      timestamp: new Date().toISOString()
  };
  await postStatus(cloneData(data))

  axiosInstance.interceptors.response.use(undefined, function (error) {
    if (error.response) {
      if (error.response.data.errorCode && botClient && botClient.party) {
        botClient.party.sendMessage(`HTTP Error: ${error.response.status} ${error.response.data.errorCode} ${error.response.data.errorMessage}`);
      }
      console.error(error.response.status, error.response.data);
    }
    return error;
  });

  botClient.on('party:updated', (updatedParty) => handlePartyUpdated(botClient, updatedParty, webhookClient, logEnabled));
  botClient.on('party:member:updated', (member) => handlePartyMemberUpdated(botClient, member));
  botClient.on('friend:request', (request) => handleFriendRequest(botClient, request, webhookClient));
  botClient.on('party:invite', (request) => handlePartyInvite(botClient, request));
  botClient.on('party:joinrequest', (receivedRequest) => handlePartyJoinRequest(botClient, receivedRequest));
  botClient.on('party:member:joined', (join) => handlePartyMemberJoined(botClient, join, eid, cid, managePartySize, bot_invite_status, bot_invite_onlinetype, bot_use_status, bot_use_onlinetype, bot_join_message, bot_leave_time, webhookClient));
  botClient.on('party:member:left', (member) => handlePartyMemberLeft(botClient, member, managePartySize));
  botClient.on('party:member:kicked', (member) => handleMemberKicked(botClient, member, managePartySize))
  botClient.on('party:member:promoted', (member) => handleMemberPromoted(botClient, member))
  botClient.on('party:member:message', msg => handleCommands(msg, botClient));
  botClient.on('friend:message', msg => handleCommands(msg, botClient));
  botClient.on('disconnected', async () => handleDisconnected(botClient));
  botClient.on('friend:added', async () => handleFriendUpdated(botClient))
  botClient.on('friend:removed', async () => handleFriendUpdated(botClient))


  if (reload) {
    setTimeout(() => reconnectClient(botClient, webhookClient), reload_time * 1000);
  }

  managePartySize(botClient, bot_invite_status, bot_invite_onlinetype, bot_use_status, bot_use_onlinetype, bot_join_message);
  initializeDiscordBot(botClient);

  process.on('SIGINT', handleExit);
  process.on('SIGTERM', handleExit);
  process.on('SIGHUP', handleExit);
  process.on('beforeExit', handleExit);
})();
