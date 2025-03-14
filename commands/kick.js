const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');

nconf.file({ file: 'config.json' });

const handleKickCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;

  const commandMatch = message.content.match(/^bot@kick\s+(\w+)/);
  if (!commandMatch) return;

  const username = commandMatch[1].trim();
  if (!username) {
    showError(`${usedClient} : No username provided!`);
    return;
  }

  const accessLevel = nconf.get('commands:kick');
  const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
  const isAdminOnly = accessLevel === 'admin_only';
  const isAdmin = admins.includes(message.author.id) || admins.includes(message.author.displayName);

  if (isAdminOnly && !isAdmin) {
    showError(`${usedClient} : You don't have permission to use this command.`);
    return;
  }
  if (!botClient.party) {
    showError(`${usedClient} : Is not in a party!`);
    return;
  }
  if (botClient.party.leader.displayName !== botClient.user.self.displayName) {
    showError(`${usedClient} : Is not the leader of the party!`);
    return;
  }

  try {
    await botClient.party.kick(username);
    showInfo(`${usedClient} : The player ${username} has been kicked`, 'commandInfo');
  } catch (err) {
    showError(`${usedClient} : Error kicking player ${username} - ${err.message}`);
  }
};

module.exports = handleKickCommand;
