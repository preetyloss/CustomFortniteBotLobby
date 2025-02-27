const { Enums } = require('fnbr');
const initClient = require('../client/initClient');
const initUsername = require('../utils/others/darkdus/initUsername')

const reconnectClient = async (botClient, webhookClient) => {
  console.log(`[LOGS] Reconnecting ${botClient.user.self.displayName}`);
  await botClient.restart();
  botClient.setMaxListeners(20);
  showInfo(`Reconnected as ${botClient.user.self.displayName}`, 'clientInfo');
  webhookClient.send(`\`\`\`diff\n+ ${botClient.user.self.displayName} Reconnected.\`\`\``);
  await initUsername(botClient.user.self.displayName)
  const partyInstance = botClient.party;
  await initClient(botClient);
  await partyInstance.setPrivacy(Enums.PartyPrivacy.PRIVATE);
};

module.exports = reconnectClient;