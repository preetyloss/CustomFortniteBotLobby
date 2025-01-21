const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');
const show = require('../utils/logs/show');
const config = nconf.file({ file: 'config.json' });

const handleSetStatusCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;
  
  const commandMatch = message.content.match(/^bot@(\w+)\s+(\w+)/);
  if (commandMatch) {
      const command = commandMatch[1];
      const status = commandMatch[2];
      
      if (command === 'setStatus') {
        let access = 'commands:' + command;
        if (nconf.get(access) === 'admin_only') {
          if (message.author.id !== nconf.get('owner')) {
            showError(`${usedClient} : You don't have permission to use this command.`);
            return;
          }
          if (!status) {
            showError(`${usedClient} : The status wasn't found!`);
            return;
          }
          try {
            await botClient.setStatus(status);
            showInfo(`${usedClient} : The status has been changed to ${status}`, 'commandInfo');
          } catch (err) {
            showError('error editing status', err);
          }
        } else {
          if (!status) {
            showError(`${usedClient} : The status wasn't found!`);
            return;
          }
          try {
            await botClient.setStatus(status);
            showInfo(`${usedClient} : The status has been changed to ${status}`, 'commandInfo');
          } catch (err) {
            showError('error editing status', err);
          }
        }
      };
  }
};

module.exports = handleSetStatusCommand;