const { Enums } = require('fnbr');

async function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
const managePartySize = async (botClient, bot_invite_status, bot_invite_onlinetype, bot_use_status, bot_use_onlinetype, bot_join_message) => {
  await sleep(2)
  if (!botClient) {
    console.error('botClient is undefined');
    return;
  }
  if (!botClient.party) {
    console.error('botClient.party is undefined');
    return;
  }

  const messages = {
    1: [bot_invite_status, bot_invite_onlinetype, "PRIVATE", false, "Time has stopped!"], 
    2: [bot_use_status, bot_use_onlinetype, "", false, bot_join_message], 
    3: [bot_use_status, bot_use_onlinetype, "", false, bot_join_message],
    4: [bot_use_status, bot_use_onlinetype, "", false, bot_join_message],
  };

  const statusDetails = messages[botClient.party.size];

  if (statusDetails) {
    if (botClient.party.size > 1 || botClient.party.size === 1 && statusDetails[0]) {
      botClient.setStatus(statusDetails[0], statusDetails[1]);
    }
    if (statusDetails[2]) botClient.party.setPrivacy(Enums.PartyPrivacy[statusDetails[2]]);
    if (botClient.party?.me?.isReady && statusDetails[3] !== undefined) {
      botClient.party.me.setReadiness(statusDetails[3]);
    }
    if (botClient.party.size > 1 && statusDetails[4]) {
      botClient.party.chat.send(`${statusDetails[4]}`);
    }
  }
};

module.exports = managePartySize;
