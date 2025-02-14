const showInfo = require('../utils/logs/showInfo');
const nconf = require('nconf');

nconf.file({ file: 'config.json' });

const handleLevelCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;

  const commandMatch = message.content.match(/^bot@level\s+(\d+)/);
  if (!commandMatch) return;

  const level = commandMatch[1];
  const accessLevel = nconf.get('commands:level');
  const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
  const isAdminOnly = accessLevel === 'admin_only';
  const isAdmin = admins.includes(message.author.id) || admins.includes(message.author.displayName);

  if (isAdminOnly && !isAdmin) {
    console.log(`${usedClient} : You don't have permission to use this command.`);
    return;
  }

  try {
    await botClient.party.me.setLevel(level);
    showInfo(`${usedClient} : Set the level to ${level}!`, 'commandInfo');
  } catch (error) {
    console.log(`${usedClient} : Error setting level:`, error);
  }
};

module.exports = handleLevelCommand;
