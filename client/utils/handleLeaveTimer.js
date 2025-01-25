const managePartySize = require('./managePartySize');
const showInfo = require('../../utils/logs/showInfo');
const nconf = require('nconf');
const config = nconf.file({ file: './config.json' });

const sendWebhook = (msg) => webhookClient.send(`\`\`\`diff\n${msg}\`\`\``);
const resetStopTimerCommand = async () => {
  nconf.set('others:stopTimer_is_use', 'no');
  nconf.save((err) => {
    if (err) {
      showError(`${usedClient} : Failed to save configuration.`);
      console.error(err);
    }
  });
}

const handleLeaveTimer = async (botClient, timerstatus) => {
  if (nconf.get('others:stopTimer_is_use') === 'yes') {
    return;
  }
  const party = botClient.party;  
  showInfo("Timer ended!", 'party');
  await new Promise((resolve) => setTimeout(resolve, 1200));
  botClient.party.leave(false);
  await resetStopTimerCommand()
  sendWebhook(`${botClient.user.self.displayName} Time tracking has stopped!`);
  timerstatus = false;
  managePartySize(botClient);
};

module.exports = handleLeaveTimer;
