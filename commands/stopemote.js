const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');
const config = nconf.file({ file: 'config.json' });

const handleStopEmoteCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;
  
  const commandMatch = message.content.match(/^bot@stopEmote/);
  if (!commandMatch) return;

  const access = 'commands:stopEmote';
  const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
  const isAdminOnly = nconf.get(access) === 'admin_only';
  const isAdmin = admins.includes(message.author.id) || admins.includes(message.author.displayName);

  if (isAdminOnly && !isAdmin) {
    showError(`${usedClient} : You don't have permission to use this command.`);
    return;
  }

  try {
    await botClient.party.me.clearEmote();
    showInfo(`${usedClient} : The emote has been stopped!`, 'commandInfo');
  } catch (error) {
    showError('Error stopping emote:', error);
  }
};

module.exports = handleStopEmoteCommand;
