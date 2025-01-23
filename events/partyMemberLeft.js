const show = require('../utils/logs/show');
const showInfo = require('../utils/logs/showInfo');

const handlePartyMemberLeft = async (botClient, member, managePartySize) => {
  if (member.displayName === botClient.user.self.displayName) {
    if (botClient.party.size === 1) {
      timerstatus = false;
    }
    showInfo(`BOT ${botClient.user.self.displayName} leaves the party`, 'party');
    managePartySize(botClient);
  } else {
    if (botClient.party.size === 1) {
      timerstatus = false;
    }
    showInfo(`The player ${member.displayName} leaves the party`, 'party');
    managePartySize(botClient);
  }
};

module.exports = handlePartyMemberLeft;
