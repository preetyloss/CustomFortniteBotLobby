const { Enums } = require('fnbr');
const nconf = require('nconf');
const postStatus = require('../client/postStatus');
const getUserData = require('../client/getData');
nconf.file({ file: 'config.json' }).load();

async function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

const managePartySize = async (botClient, bot_invite_status, bot_invite_onlinetype, bot_use_status, bot_use_onlinetype, bot_join_message) => {
    if (!botClient) {
        console.error('botClient is undefined');
        return;
    }

    const userData = getUserData(botClient.user.self.displayName);
    await sleep(2);

    if (botClient.party.size === 1) {
        let data = {
            username: botClient.user.self.displayName,
            status: "Online",
            friends: userData?.friends || 0,
            party: "alone",
            matchmaking: "available",
            timestamp: new Date().toISOString()
        };
        await postStatus(data);
        await botClient.setStatus(bot_invite_status, bot_invite_onlinetype);
    } else {
        let data = {
            username: botClient.user.self.displayName,
            status: "Online",
            friends: userData?.friends || 0,
            party: "in_party",
            matchmaking: "available",
            timestamp: new Date().toISOString()
        };
        await postStatus(data);
        await botClient.setStatus(bot_use_status, bot_use_onlinetype);
    }

    if (nconf.get('fortnite:banned_from_matchmaking')) {
        botClient.setStatus(nconf.get('client:status:matchmaking_banned'));
        let data = {
            username: botClient.user.self.displayName,
            friends: userData?.friends || 0,
            matchmaking: "banned",
            timestamp: new Date().toISOString()
        };
        await postStatus(data);
    }
};

module.exports = managePartySize;
