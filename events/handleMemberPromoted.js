const showError = require('../utils/logs/showError');
const showInfo = require('../utils/logs/showInfo');
const { eid } = require('../structs/config');

const handleMemberPromoted = async (botClient, member) => {
  try {
    if (member.displayName !== botClient.user.self.displayName) {
      showInfo(`The player ${member.displayName} has been promoted`, 'party');
    } else {
      showInfo('The bot has been promoted', 'party');
      await botClient.party.me.setEmote(eid);
    }
  } catch (error) {
    showError(`Failed to handle member kick: ${error.message}`);
  }
};

module.exports = handleMemberPromoted;