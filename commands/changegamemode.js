const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');
nconf.file({ file: 'config.json' });

const handleChangeGameModeCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;

  const commandMatch = message.content.match(/^bot@changeGamemode\s+(\w+)/);
  if (!commandMatch) return;

  const gamemode = commandMatch[1].trim();

  const accessLevel = nconf.get('commands:changeGamemode');
  const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
  const isAdminOnly = accessLevel === 'admin_only';
  const isAdmin = admins.includes(message.author.id) || admins.includes(message.author.displayName);

  if (isAdminOnly && !isAdmin) {
    showError(`${usedClient} : You don't have permission to use this command.`);
    return;
  }

  if (!gamemode) {
    showError(`${usedClient} : No Gamemode info supplied for "bot@changeGamemode".`);
    return;
  }

  try {
    await botClient.party.setPlaylist(gamemode);
    showInfo(`${usedClient} : The gamemode has been updated to ${gamemode}`, 'commandInfo');
  } catch (error) {
    showError(`${usedClient} : Error changing gamemode: ${error.message}`);
  }
};

module.exports = handleChangeGameModeCommand;
