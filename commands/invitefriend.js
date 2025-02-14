const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');

nconf.file({ file: 'config.json' });

const handleInviteFriendCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;

  const commandMatch = message.content.match(/^bot@inviteFriend\s+(\w+)/);
  if (!commandMatch) return;

  const username = commandMatch[1].trim();
  if (!username) {
    showError(`${usedClient} : No username provided!`);
    return;
  }

  const accessLevel = nconf.get('commands:inviteFriend');
  const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
  const isAdminOnly = accessLevel === 'admin_only';
  const isAdmin = admins.includes(message.author.id) || admins.includes(message.author.displayName);

  if (isAdminOnly && !isAdmin) {
    showError(`${usedClient} : You don't have permission to use this command.`);
    return;
  }

  try {
    await botClient.party.invite(username);
    showInfo(`${usedClient} : The player ${username} has been invited`, 'commandInfo');
  } catch (err) {
    showError(`${usedClient} : Error inviting player ${username} - ${err.message}`);
  }
};

module.exports = handleInviteFriendCommand;
