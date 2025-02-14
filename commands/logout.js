const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');

nconf.file({ file: 'config.json' });

const handleLogoutCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;

  const commandMatch = message.content.match(/^bot@logout/);
  if (!commandMatch) return;

  const accessLevel = nconf.get('commands:logout');
  const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
  const isAdminOnly = accessLevel === 'admin_only';
  const isAdmin = admins.includes(message.author.id) || admins.includes(message.author.displayName);

  if (isAdminOnly && !isAdmin) {
    showError(`${usedClient} : You don't have permission to use this command.`);
    return;
  }

  try {
    await botClient.party.me.clearEmote();
    await botClient.leaveParty(false);
    await botClient.logout();
    showInfo(`${usedClient} : The bot is logged out`, 'commandInfo');
  } catch (error) {
    showError(`${usedClient} : Error logging out`, error);
  }
};

module.exports = handleLogoutCommand;
