const showInfo = require('../utils/logs/showInfo');
const nconf = require('nconf');
const config = nconf.file({ file: 'config.json' });

const handleLevelCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;
  
  const commandMatch = message.content.match(/^bot@(\w+)\s+(\w+)/);
  if (commandMatch) {
      const command = commandMatch[1];
      const level = commandMatch[2];
      
      if (command === 'level') {
        let access = 'commands:' + command;
        const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
        if (nconf.get(access) === 'admin_only') {
          if (!admins.includes(message.author.id) || !admins.includes(message.author.displayName)) {
            console.log(`${usedClient} : You don't have permission to use this command.`);
            return;
          }
          if (!level) {
            console.log(`${usedClient} : No Level info supplied for "bot@setLevel".`);
            return;
          }
          try {
            await botClient.party.me.setLevel(level);
            showInfo(`${usedClient} : Set the level to ${level}!`, 'commandInfo');
          } catch (error) {
            console.log('Error setting level:', error);
          }
        } else {
            if (!level) {
              console.log(`${usedClient} : No Level info supplied for "bot@setLevel".`);
              return;
            }
            try {
              await botClient.party.me.setLevel(level);
              showInfo(`${usedClient} : Set the level to ${level}!`, 'commandInfo');
            } catch (error) {
              console.log('Error setting level:', error);
            }
        }
      };
  }
};

module.exports = handleLevelCommand;