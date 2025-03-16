const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');

nconf.file({ file: './config.json' });

const isHelpCommandAvailable = nconf.get('others:help_command');
const version = nconf.get('DarkDus:version');

const helpMessage = `DarkDus - A Custom Fortnite Bot ${version} \n
Commands:\n
- bot@outfit <newSkin>\n
- bot@pickaxe <newPickaxe>\n
- bot@backpack <newBackpack>\n
- bot@changeGamemode <gamemode>\n
- bot@kick <username>\n
- bot@promote <username>\n
- bot@inviteFriend <username>\n
- bot@addFriend <username>\n
- bot@removeFriend <username>\n
- bot@clearFriends\n
- bot@friendList\n
- bot@emote <emote>\n
- bot@stopEmote\n
- bot@level <level>\n
- bot@crown <level>\n
- bot@showCrowns\n
- bot@stopTimer\n
- bot@setStatus <newStatus>\n
- bot@logout\n
- bot@help\n`;

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
