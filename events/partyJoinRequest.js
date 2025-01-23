const showError = require('../utils/logs/showError');
const showInfo = require('../utils/logs/showInfo');
const nconf = require('nconf');
const config = nconf.file({ file: 'config.json' });

const handlePartyJoinRequest = async (botClient, receivedRequest) => {
  const bannedPlayer = nconf.get('client:banned_player') || [];
  if (bannedPlayer.includes(receivedRequest.displayName)) {
    showInfo(`${receivedRequest.displayName} try to join the bot but he is banned...`)
    return
  }
  showInfo('Join request received.', 'party');
  try {
    await receivedRequest.accept();
    showInfo('Join request accepted.', 'party');
  } catch (error) {
    showError('Error accepting join request:', error.stack || error);
  }
};

module.exports = handlePartyJoinRequest;
