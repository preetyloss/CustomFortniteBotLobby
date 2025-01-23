const managePartySize = require('./managePartySize');
const sendWebhook = (msg) => webhookClient.send(`\`\`\`diff\n${msg}\`\`\``);

const handleLeaveTimer = async (botClient, timerstatus) => {
  const party = botClient.party;  
  console.log("Timer ended!");
  await new Promise((resolve) => setTimeout(resolve, 1200));
  botClient.party.leave(false);
  sendWebhook(`${botClient.user.self.displayName} Time tracking has stopped!`);
  timerstatus = false;
  managePartySize(botClient);
};

module.exports = handleLeaveTimer;
