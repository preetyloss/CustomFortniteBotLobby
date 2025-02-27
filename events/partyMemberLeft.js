const showInfo = require('../utils/logs/showInfo');
const { bot_invite_status, bot_invite_onlinetype } = require('../structs/config');
const changeTimerStat = require('./changeTimerStat')

const handlePartyMemberLeft = async (botClient, member, managePartySize) => {
  if (member.displayName === botClient.user.self.displayName) {
    if (botClient.party.size === 1) {
      timerstatus = false;
      botClient.setStatus(bot_invite_status, bot_invite_onlinetype);
      await changeTimerStat()
    }
    showInfo(`BOT ${botClient.user.self.displayName} leaves the party`, 'party');
    managePartySize(botClient);
  } else {
    if (botClient.party.size === 1) {
      timerstatus = false;
      botClient.setStatus(bot_invite_status, bot_invite_onlinetype);
      await changeTimerStat()
    }
    showInfo(`The player ${member.displayName} leaves the party`, 'party');
    managePartySize(botClient);
  }
};

module.exports = handlePartyMemberLeft;
