const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');
const config = nconf.file({ file: 'config.json' });

const handlePartyInvite = async (botClient, request) => {
  try {
    const bannedPlayers = nconf.get('client:banned_player') || [];
    if (bannedPlayers.includes(request.displayName)) {
      showInfo(`${request.sender.displayName} tried to invite the bot but he is banned...`);
      return;
    }

    const party = botClient.party;
    showInfo(`Received a party invite from ${request.sender.displayName} ${request.sender.id}`, 'party');

    if (party && party.size > 1) {
      await request.decline();
      showInfo(`Declined party invite from ${request.sender.displayName} ${request.sender.id} as the bot is already in a party`, 'party');
    } else {
      await request.accept();
      showInfo(`Accepted party invite from ${request.sender.displayName} ${request.sender.id}`, 'party');
    }
  } catch (error) {
    showError(`Failed to handle party invite: ${error.message}`);
  }
};

module.exports = handlePartyInvite;