const showError = require('../utils/logs/showError');
const showInfo = require('../utils/logs/showInfo');
const changeTimerStat = require('./changeTimerStat')

const handleMemberKicked = async (botClient, member, managePartySize) => {
  try {
    if (member.displayName !== botClient.user.self.displayName) {
      showInfo(`The player ${member.displayName} has been kicked`, 'party');
    } else {
      showInfo('The bot has been kicked', 'party');
      managePartySize(botClient);
      await changeTimerStat()
      await botClient.createParty();
    }
  } catch (error) {
    showError(`Failed to handle member kick: ${error.message}`);
  }
};

module.exports = handleMemberKicked;