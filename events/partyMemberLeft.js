const handlePartyMemberLeft = async (botClient, member, sendWebhook, managePartySize) => {
  if (member.displayName === botClient.user.self.displayName) {
    if (botClient.party.size === 1) {
      timerstatus = false;
    }
    console.log(`- BOT ${botClient.user.self.displayName} leaves the party`);
    sendWebhook(`- BOT ${botClient.user.self.displayName} leaves the party`);
    managePartySize(botClient);
  } else {
    if (botClient.party.size === 1) {
      timerstatus = false;
    }
    console.log(`- The player ${member.displayName} leaves the party`);
    sendWebhook(`- The player ${member.displayName} leaves the party`);
    managePartySize(botClient);
  }
};

module.exports = handlePartyMemberLeft;
