const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');

nconf.file({ file: './config.json' });

const handlePickaxeCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;
  
  const commandMatch = message.content.match(/^bot@pickaxe\s+(\d+)/);
  if (!commandMatch) return;
  
  const pickaxeId = commandMatch[1];
  
  const access = 'commands:pickaxe';
  const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
  const isAdminOnly = nconf.get(access) === 'admin_only';
  const isAdmin = admins.includes(message.author.id) || admins.includes(message.author.displayName);

  if (isAdminOnly && !isAdmin) {
    showError(`${usedClient} : You don't have permission to use this command.`);
    return;
  }

  try {
    await botClient.party.me.setPickaxe(pickaxeId);
    showInfo(`${usedClient} : Set the pickaxe to ${pickaxeId}!`, 'commandInfo');
  } catch (err) {
    showError('Error setting pickaxe', err);
  }
};

module.exports = handlePickaxeCommand;
