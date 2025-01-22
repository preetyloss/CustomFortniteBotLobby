const showInfo = require('../utils/logs/showInfo');

const handlePartyInvite = async (botClient, request) => {
  const bannedPlayer = nconf.get('client:banned_player') || [];
  if (bannedPlayer.includes(request.displayName)) {
    showInfo(`${request.displayName} try to invite the bot but he is banned...`)
    return
  }
  const party = botClient.party;  
  showInfo(`Received a party invite from ${request.displayName} ${request.id}`, 'party');
  if (party.size === 1) {
    await request.accept();
    showInfo(`Accepted party invite from ${request.displayName} ${request.id}`, 'party');
  } else {
    await request.decline();
    showInfo(`Declined party invite from ${request.displayName} ${request.id}`, 'party');
  }
};

module.exports = handlePartyInvite;
