const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');
const config = nconf.file({ file: 'config.json' });

const handleChangeGameModeCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;
  
  const commandMatch = message.content.match(/^bot@(\w+)\s+(\w+)/);
  if (commandMatch) {
      const command = commandMatch[1];
      const gamemode = commandMatch[2];

      if (command === 'changeGamemode') {
        let access = 'commands:' + command;
        if (nconf.get(access) === 'admin_only') {
            if (message.author.id !== nconf.get('owner')) {
                showError(`${usedClient} : You don't have permission to use this command.`);
                return;
            }
            if (!gamemode) {
                showError(`${usedClient} : No Gamemode info supplied for "bot@changegamemode".`);
                return;
            }
            try {
                await botClient.party.me.setPlaylist(gamemode)
                showInfo(`${usedClient} : The gamemode has been updated`, 'commandInfo');   
            } catch (error) {
                showError('Error changing gamemode:', error);
            }
        } else {
            if (!gamemode) {
                showError(`${usedClient} : No Gamemode info supplied for "bot@changegamemode".`);
                return;
            }
            try {
                await botClient.party.me.setPlaylist(gamemode)
                showInfo(`${usedClient} : The gamemode has been updated`, 'commandInfo');   
            } catch (error) {
                showError('Error changing gamemode:', error);
            }
        }
      };
  }
};

module.exports = handleChangeGameModeCommand;