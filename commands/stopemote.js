const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');
const config = nconf.file({ file: 'config.json' });

const handleStopEmoteCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;
  
  const commandMatch = message.content.match(/^bot@(\w+)/);
  if (commandMatch) {
      const command = commandMatch[1];
      
      if (command === 'stopEmote') {
        let access = 'commands:' + command;
        const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
        if (nconf.get(access) === 'admin_only') {
          if (!admins.includes(message.author.id)) {
            showError(`${usedClient} : You don't have permission to use this command.`);
            return;
          }
          try {
            await botClient.party.me.clearEmote()
            showInfo(`${usedClient} : The emote has been stoped!`, 'commandInfo');
          } catch (error) {
            showError('Error stopping emote:', error);
          }
        } else {
          try {
            await botClient.party.me.clearEmote()
            showInfo(`${usedClient} : The emote has been stoped!`, 'commandInfo');
          } catch (error) {
            showError('Error stopping emote:', error);
          }
        }
      };
  }
};

module.exports = handleStopEmoteCommand;