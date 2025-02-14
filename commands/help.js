const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');

nconf.file({ file: './config.json' });

const isHelpCommandAvailable = nconf.get('others:help_command');
const version = nconf.get('DarkDus:version');

const helpMessage = `Dark Dus - A Custom Fortnite Bot ${version} \nCommands:\n` +
  `- bot@inviteFriend\n- bot@kick\n- bot@changeGamemode\n- bot@addFriend\n` +
  `- bot@logout\n- bot@changeStatus\n- bot@backpack\n- bot@pickaxe\n- bot@outfit\n` +
  `- bot@promote\n- bot@level\n- bot@ready\n- bot@battlepass\n- bot@emote\n` +
  `- bot@stopEmote\n- bot@help`;

const handleHelpCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;

  const commandMatch = message.content.match(/^bot@help/);
  if (!commandMatch) return;

  const accessLevel = nconf.get('commands:help');
  const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
  const isAdminOnly = accessLevel === 'admin_only';
  const isAdmin = admins.includes(message.author.id) || admins.includes(message.author.displayName);

  if (isAdminOnly && !isAdmin) {
    showError(`${usedClient} : You don't have permission to use this command.`);
    return;
  }

  if (isHelpCommandAvailable !== 'disabled') {
    showInfo(`${usedClient} : The help command has been used!`, 'commandInfo');
    showInfo(helpMessage, 'commandInfo');
  }
};

module.exports = handleHelpCommand;
