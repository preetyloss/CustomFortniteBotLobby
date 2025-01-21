const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');
const config = nconf.file({ file: 'config.json' });

const handlePromoteCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;
  
  const commandMatch = message.content.match(/^bot@(\w+)\s+(\w+)/);
  if (commandMatch) {
      const command = commandMatch[1];
      const username = commandMatch[2];
      
      if (command === 'promote') {
        let access = 'commands:' + command;
        if (nconf.get(access) === 'admin_only') {
          if (message.author.id !== nconf.get('owner')) {
            showError(`${usedClient} : You don't have permission to use this command.`);
            return;
          }
          if (!username) {
            showError(`${usedClient} : The player wasn't found!`);
            return;
          }
          try {
            await botClient.party.me.promote(player);
            showInfo(`${usedClient} : The player has been promoted`);
          } catch (err) {
            showError('error promoting player', err);
          }
        } else {
          if (!username) {
            showError(`${usedClient} : The player wasn't found!`);
            return;
          }
          try {
            await botClient.party.me.promote(player);
            showInfo(`${usedClient} : The player has been promoted`);
          } catch (err) {
            showError('error promoting player', err);
          }
        }
      };
  }
};

module.exports = handlePromoteCommand;