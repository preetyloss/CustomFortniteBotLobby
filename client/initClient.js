const showError = require('../utils/logs/showError')
const showInfo = require('../utils/logs/showInfo')
const nconf = require('nconf');
const { 
    bot_invite_status, cid, bid, level, banner
} = require('../structs/config');

module.exports = async (client) => {
    if (!level) {
        level = "999"
        if (client.party && client.party.me) {
            client.setStatus(bot_invite_status);
            await client.party.me.setOutfit(cid);
            await client.party.me.setLevel(level);
            await client.party.me.setBanner(banner);
            await client.party.me.setBackpack(bid);
            showInfo('Client\'s outfit is ready!', 'clientInfo');
        } else {
            showError('Miss information (client.party and client.party.me)')
        }
    } else {
        if (client.party && client.party.me) {
            client.setStatus(bot_invite_status);
            await client.party.me.setOutfit(cid);
            await client.party.me.setLevel(level);
            await client.party.me.setBanner(banner);
            await client.party.me.setBackpack(bid);
            showInfo('Client\'s outfit is ready!', 'clientInfo');
            showInfo(`Client\'s default level is set (${level})`, 'clientInfo')
        } else {
            showError('Miss information (client.party and client.party.me)')
        }
    }

};

