const showError = require('../utils/logs/showError');
const showInfo = require('../utils/logs/showInfo');

const handlePartyJoinRequest = async (botClient, receivedRequest) => {
  showInfo('Join request received.', 'party');
  try {
    await receivedRequest.accept();
    showInfo('Join request accepted.', 'party');
  } catch (error) {
    showError('Error accepting join request:', error.stack || error);
  }
};

module.exports = handlePartyJoinRequest;
