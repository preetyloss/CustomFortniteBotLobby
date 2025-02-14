const showInfo = require('../utils/logs/showInfo');
const nconf = require('nconf');

nconf.file({ file: 'config.json' });

const handleCrownsCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;

  const commandMatch = message.content.match(/^bot@crown\s+(\d+)/);
  if (!commandMatch) return;

  const crown = commandMatch[1];
  const accessCrown = nconf.get('commands:crown');
  const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
  const isAdminOnly = accessCrown === 'admin_only';
  const isAdmin = admins.includes(message.author.id) || admins.includes(message.author.displayName);

  if (isAdminOnly && !isAdmin) {
    console.log(`${usedClient} : You don't have permission to use this command.`);
    return;
  }

  try {
    botClient.party.me.setCosmeticStats(crown, 1)
    showInfo(`${usedClient} : Set the crown to ${crown}!`, 'commandInfo');
  } catch (error) {
    console.log(`${usedClient} : Error setting level:`, error);
  }
};

module.exports = handleCrownsCommand;
