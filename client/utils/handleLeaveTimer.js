const managePartySize = require('./managePartySize');
const showInfo = require('../../utils/logs/showInfo');
const nconf = require('nconf');
const config = nconf.file({ file: './config.json' });

const resetStopTimerCommand = async () => {
  nconf.set('others:stopTimer_is_use', 'no');
  nconf.save((err) => {
    if (err) {
      showError(`${usedClient} : Failed to save configuration.`);
      console.error(err);
    }
  });
}

const handleLeaveTimer = async (botClient, timerstatus, webhookClient) => {
  if (nconf.get('others:stopTimer_is_use') === 'yes') {
    return;
  }

  if (botClient) {
    showInfo("Timer ended!", 'party');
    await new Promise((resolve) => setTimeout(resolve, 1200));
    await botClient.leaveParty(false);
    await resetStopTimerCommand()
    webhookClient.send(`${botClient.user.self.displayName} Time tracking has stopped!`);
    timerstatus = false;
    managePartySize(botClient);
  } else {
    console.log('botClient is undefined...')
  }
};

module.exports = handleLeaveTimer;
