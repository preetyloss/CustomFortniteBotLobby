const showInfo = require('../utils/logs/showInfo');
const handleLeaveTimer = require('../client/utils/handleLeaveTimer');

let timerstatus = false;

const handlePartyMemberJoined = async (botClient, join, eid, cid, managePartySize, bot_invite_status, bot_invite_onlinetype, bot_use_status, bot_use_onlinetype, bot_join_message, bot_leave_time, sendWebhook) => {
  if (botClient.party.size > 1) {
    if (!timerstatus) {
      setTimeout(() => handleLeaveTimer(botClient, sendWebhook, timerstatus), bot_leave_time * 1000);
      timerstatus = true;
    }
  }
  botClient.party.me.sendPatch({
    'Default:FORTStats_j': '{"FORTStats":{"fortitude":3000,"offense":3000,"resistance":3000,"tech":3000,"teamFortitude":3000,"teamOffense":3000,"teamResistance":3000,"teamTech":3000,"fortitude_Phoenix":3000,"offense_Phoenix":3000,"resistance_Phoenix":3000,"tech_Phoenix":3000,"teamFortitude_Phoenix":3000,"teamOffense_Phoenix":3000,"teamResistance_Phoenix":3000,"teamTech_Phoenix":3000}}'
  });
  await botClient.party.me.setEmote(eid);
  managePartySize(botClient, bot_invite_status, bot_invite_onlinetype, bot_use_status, bot_use_onlinetype, bot_join_message);
  await botClient.party.me.setOutfit(cid);
  showInfo(`Party member joined: ${join.displayName}`, 'party');
};

module.exports = handlePartyMemberJoined;
