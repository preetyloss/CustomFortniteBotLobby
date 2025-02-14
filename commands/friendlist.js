const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');
nconf.file({ file: 'config.json' });

const handleFriendListCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;

  const commandMatch = message.content.match(/^bot@friendList/);
  if (!commandMatch) return;

  const accessLevel = nconf.get('commands:friendList');
  const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
  const isAdminOnly = accessLevel === 'admin_only';
  const isAdmin = admins.includes(message.author.id) || admins.includes(message.author.displayName);

  if (isAdminOnly && !isAdmin) {
    showError(`${usedClient} : You don't have permission to use this command.`);
    return;
  }

  try {
    const friendsList = Array.from(botClient.friend.list.values());
    const friendNames = friendsList.map(friend => friend.displayName);

    showInfo(`${usedClient} : The command friendList has been used. Friends: ${friendNames.join(', ') || 'No friends'}`, 'commandInfo');
  } catch (error) {
    showError(`${usedClient} : Error retrieving friend list: ${error.message}`);
  }
};

module.exports = handleFriendListCommand;
