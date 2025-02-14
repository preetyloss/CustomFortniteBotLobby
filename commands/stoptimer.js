const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');
nconf.file({ file: './config.json' });

const handleStopTimerCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;
  
  const commandMatch = message.content.match(/^bot@stopTimer/);
  if (!commandMatch) return;

  const stopTimer = nconf.get('others:stopTimer_is_use');
  const access = 'commands:stopTimer';
  const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
  const isAdminOnly = nconf.get(access) === 'admin_only';
  const isAdmin = admins.includes(message.author.id) || admins.includes(message.author.displayName);

  if (isAdminOnly && !isAdmin) {
    showError(`${usedClient} : You don't have permission to use this command.`);
    return;
  }

  const handleTimerActivation = () => {
    if (stopTimer === 'no') {
      nconf.set('others:stopTimer_is_use', 'yes');
      nconf.save((err) => {
        if (err) {
          showError(`${usedClient} : Failed to save configuration.`);
          console.error(err);
        } else {
          showInfo(`${usedClient} : Stop party timer has been activated.`);
        }
      });
    } else {
      showError(`${usedClient} : Stop party timer is already stopped.`);
    }
  };

  handleTimerActivation();
};

module.exports = handleStopTimerCommand;
