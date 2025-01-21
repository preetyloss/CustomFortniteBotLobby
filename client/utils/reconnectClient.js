const { Enums } = require('fnbr');

const reconnectClient = async (botClient, webhookClient, initClient) => {
  console.log(`[LOGS] Reconnecting ${botClient.user.self.displayName}`);
  await botClient.logout();
  botClient.setMaxListeners(20);
  await botClient.login();
  console.log(`[LOGS] Reconnected as ${botClient.user.self.displayName}`);
  webhookClient.send(`\`\`\`diff\n+ ${botClient.user.self.displayName} Reconnected.\`\`\``);
  await initClient(botClient);
  await botClient.party.setPrivacy(Enums.PartyPrivacy.PRIVATE);
};

module.exports = reconnectClient;
