const { Enums } = require('fnbr');
const nconf = require('nconf')
const postStatus = require('../postStatus')
const getUserData = require('../getData')
const config = nconf.file({file: 'config.json'})
let data

async function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
const managePartySize = async (botClient, bot_invite_status, bot_invite_onlinetype, bot_use_status, bot_use_onlinetype, bot_join_message) => {
  const userData = getUserData(botClient.user.self.displayName)
  await sleep(2)
  if (!botClient) {
    console.error('botClient is undefined');
    return;
  }
  if (!botClient.party) {
    console.error('botClient.party is undefined');
    return;
  }

  if (nconf.get('fortnite:banned_from_matchmaking')) {
    botClient.setStatus(nconf.get('client:status:matchmaking_banned'))
    data = {
      username: botClient.user.self.displayName,
      friends: userData.friends,
      status: "Online",
      party: "in_party",
      matchmaking: "banned",
      timestamp: new Date().toISOString()
    };
    await postStatus(data)

  } else {
    const size = botClient.party.size
    if (size === 1) {
      botClient.setStatus(bot_invite_status, bot_invite_onlinetype)
    } else {
      botClient.setStatus(bot_use_status, bot_use_onlinetype)
    }


    data = {
      username: botClient.user.self.displayName,
      status: "Online",
      friends: userData.friends,
      party: botClient.party.size === 1 ? "alone" : "in_party",
      matchmaking: "available",
      timestamp: new Date().toISOString()
    }
    await postStatus(data)
  }
};

module.exports = managePartySize;
