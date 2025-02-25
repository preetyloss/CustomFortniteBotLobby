const showInfo = require('../utils/logs/showInfo');
const nconf = require('nconf');
const config = nconf.file({ file: 'config.json' });

const handlePartyInvite = async (botClient, request) => {
  const bannedPlayer = nconf.get('client:banned_player') || [];
  if (bannedPlayer.includes(request.displayName)) {
    showInfo(`${request.sender.displayName} try to invite the bot but he is banned...`);
    return;
  }

  const party = botClient.party;
  showInfo(`Received a party invite from ${request.sender.displayName} ${request.sender.id}`, 'party');

  if (party) {
    showInfo(`Current party ID: ${party.id}`, 'party');
  }

  try {
    await botClient.party.me.sendPatch({
      delete: [],
      update: {
        'Default:LobbyState_j': '{"LobbyState":{"gameReadiness":"NotReady","readyInputType":"Count"}}'
      }
    });
  } catch (error) {
    if (error.code === 'errors.com.epicgames.social.party.party_not_found') {
      showInfo(`Current party ID ${party.id} does not exist. Accepting new invite...`, 'party');
      await request.accept();
      showInfo(`Accepted party invite from ${request.sender.displayName} ${request.sender.id}`, 'party');
      return;
    }
  }

  if (!party || party.id !== request.party.id) {
    await request.accept();
    showInfo(`Accepted party invite from ${request.sender.displayName} ${request.sender.id}`, 'party');
  } else {
    if (party.size === 1) {
      await request.accept();
      showInfo(`Accepted party invite from ${request.sender.displayName} ${request.sender.id}`, 'party');
    } else {
      await request.decline();
      showInfo(`Declined party invite from ${request.sender.displayName} ${request.sender.id}`, 'party');
    }
  }
};

module.exports = handlePartyInvite;