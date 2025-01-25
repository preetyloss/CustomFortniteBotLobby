const showInfo = require('../utils/logs/showInfo');
const nconf = require('nconf');
nconf.file({ file: './config.json' });

const handleStopTimerCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;
  
  const commandMatch = message.content.match(/^bot@(\w+)/);
  if (commandMatch) {
      const command = commandMatch[1];
      const stopTimer = nconf.get('others:stopTimer_is_use');
      
      if (command === 'stopTimer') {
        let access = 'commands:' + command;
        const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
        if (nconf.get(access) === 'admin_only') {
          if (!admins.includes(message.author.id) || !admins.includes(message.author.displayName)) {
            showError(`${usedClient} : You don't have permission to use this command.`);
            return;
          }
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
        } else {
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
            showError(`${usedClient} : Stop party Timer is already stopped.`);
          }
        }
      };
  }
};

module.exports = handleStopTimerCommand;