const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');
nconf.file({ file: './config.json' });

const handleStopTimerCommand = async () => {
  const usedClient = botClient.user.self.displayName;
  const stopTimer = nconf.get('others:stopTimer_is_use');

    if (stopTimer === 'yes') {
      nconf.set('others:stopTimer_is_use', 'no');
      nconf.save((err) => {
        if (err) {
          showError(`${usedClient} : Failed to save configuration.`);
          console.error(err);
        } else {
          showInfo(`${usedClient} : Stop party timer has been stopped.`);
        }
      });
    } else {
      showError(`${usedClient} : Stop party timer is stopped.`);
    }
};

module.exports = handleStopTimerCommand;
