const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');
const config = nconf.file({ file: 'config.json' });

const handleKickCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;
  
  const commandMatch = message.content.match(/^bot@(\w+)\s+(\w+)/);
  if (commandMatch) {
      const command = commandMatch[1];
      const username = commandMatch[2];
      
      if (command === 'kick') {
        let access = 'commands:' + command;
        const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
        if (nconf.get(access) === 'admin_only') {
          if (!admins.includes(message.author.id) || !admins.includes(message.author.displayName)) {
            showError(`${usedClient} : You don't have permission to use this command.`);
            return;
          }
          if (!username) {
            showError(`${usedClient} : The player wasn't found!`);
            return;
          }
          try {
            await botClient.party.kick(player);
            showInfo(`${usedClient} : The player has been kicked`, 'commandInfo');
          } catch (err) {
            showError('error kicking player', err);
          }
        } else {
          if (!username) {
            showError(`${usedClient} : The player wasn't found!`);
            return;
          }
          try {
            await botClient.party.kick(player);
            showInfo(`${usedClient} : The player has been kicked`, 'commandInfo');
          } catch (err) {
            showError('error kicking player', err);
          }
        }

      };
  }
};

module.exports = handleKickCommand;