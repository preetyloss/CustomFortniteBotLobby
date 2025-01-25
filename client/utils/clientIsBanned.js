const { fetchCosmetic } = require('../utils/outfit/api');
const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');
const config = nconf.file({ file: 'config.json' });

const handleClientIsBanned = async (botClient) => {
    await botClient.party.me.clearEmote()
    await botClient.party.me.setEmote('EID_Wave');
};

module.exports = handleClientIsBanned;