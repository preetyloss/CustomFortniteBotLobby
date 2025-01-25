const showInfo = require('../utils/logs/showInfo');
const nconf = require('nconf');

nconf.file({ file: './config.json' });
const is_this_command_avaible = nconf.get('others:help_command')
const version = nconf.get('DarkDus:version')
let message = `Dark Dus - A Custom Fortnite Bot ${version} \n Commands: \n - bot@inviteFriend \n - bot@kick \n - bot@changeGamemode \n - bot@addFriend \n - bot@logout \n - bot@changeStatus \n - bot@backpack \n - bot@pickaxe \n - bot@outfit \n - bot@promote \n - bot@level \n - bot@ready \n - bot@battlepass \n - bot@emote \n - bot@stopEmote \n - bot@help`

const handleHelpCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;
  
  const commandMatch = message.content.match(/^bot@(\w+)/);
  if (commandMatch) {
      const command = commandMatch[1];
      
      if (command === 'help') {
        let access = 'commands:' + command;
        const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
        if (nconf.get(access) === 'admin_only') {
          if (!admins.includes(message.author.id) || !admins.includes(message.author.displayName)) {
            showError(`${usedClient} : You don't have permission to use this command.`);
            return;
          }
          if (is_this_command_avaible !== "disabled") {
            showInfo(`${usedClient} : ${message}`, 'commandInfo');
          }
        } else {
          if (is_this_command_avaible !== "disabled") {
            showInfo(`${usedClient} : The help has been used!`, 'commandInfo');
          }
        }
      };
  }
};

module.exports = handleHelpCommand;