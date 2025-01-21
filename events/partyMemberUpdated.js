const handlePartyMemberUpdated = async (botClient, member) => {
  if (member.id == botClient.user.id) return;
  if (!botClient.party.me) return;

  if ((member.isReady && (botClient?.party?.me?.isLeader || member.isLeader) && !botClient.party?.me?.isReady) && !botClient.party.bManualReady) {
    if (botClient.party?.me?.isLeader) {
      await member.promote();
    }
    botClient.party.me.setReadiness(true);
  } else if ((!member.isReady && member.isLeader) && !botClient.party.bManualReady) {
    try {
      botClient.WSS.close();
    } catch { }
    botClient.party.me.setReadiness(false);
  }

  let allMembersReady = true;

  botClient.party.members.forEach(member => {
    if (!allMembersReady) return;
    allMembersReady = member.isReady;
  });
};

module.exports = handlePartyMemberUpdated;
