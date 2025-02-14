const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');
nconf.file({ file: 'config.json' });

const handleShowCrownsCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;

  const commandMatch = message.content.match(/^bot@showCrowns/);
  if (!commandMatch) return;

  const accessLevel = nconf.get('commands:showCrowns');
  const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
  const isAdminOnly = accessLevel === 'admin_only';
  const isAdmin = admins.includes(message.author.id) || admins.includes(message.author.displayName);

  if (isAdminOnly && !isAdmin) {
    showError(`${usedClient} : You don't have permission to use this command.`);
    return;
  }

  try {
    await botClient.party.me.setEmote("EID_Coronet");
    showInfo(`${usedClient} : showCrowns command has been used!`, 'commandInfo');
  } catch (error) {
    showError(`${usedClient} : Error setting emote - ${error.message}`);
  }
};

module.exports = handleShowCrownsCommand;
