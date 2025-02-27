const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');
const show = require('../utils/logs/show');
const config = nconf.file({ file: 'config.json' });

const handleSetStatusCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;
  
  const commandMatch = message.content.match(/^bot@setStatus\s+(\w+)/);
  if (!commandMatch) return;

  const status = commandMatch[1];

  const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
  const access = 'commands:setStatus';
  const isAdminOnly = nconf.get(access) === 'admin_only';
  const isAdmin = admins.includes(message.author.id) || admins.includes(message.author.displayName);

  if (isAdminOnly && !isAdmin) {
    showError(`${usedClient} : You don't have permission to use this command.`);
    return;
  }

  if (!status) {
    showError(`${usedClient} : The status wasn't found!`);
    return;
  }

  try {
    await botClient.setStatus(status);
    showInfo(`${usedClient} : The status has been changed to ${status}`, 'commandInfo');
  } catch (err) {
    showError('Error editing status', err);
  }
};

module.exports = handleSetStatusCommand;
