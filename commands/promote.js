const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');

nconf.file({ file: 'config.json' });

const handlePromoteCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;
  
  const commandMatch = message.content.match(/^bot@promote\s+(.+)/);
  if (!commandMatch) return;
  
  const username = commandMatch[1].trim();
  
    const access = 'commands:promote';
    const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
    const isAdminOnly = nconf.get(access) === 'admin_only';
    const isAdmin = admins.includes(message.author.id) || admins.includes(message.author.displayName);

    if (isAdminOnly && !isAdmin) {
      showError(`${usedClient} : You don't have permission to use this command.`);
      return;
    }

    if (!username) {
      showError(`${usedClient} : The player wasn't found!`);
      return;
    }

    if (!botClient.party) {
      showError(`${usedClient} : Is not in a party!`);
      return;
    }
    if (botClient.party.leader.displayName !== botClient.user.self.displayName) {
      showError(`${usedClient} : Is not the leader of the party!`);
      return;
    }

    try {
      if (username === "me") {
        await botClient.party.me.promote(message.author.displayName);
        showInfo(`${usedClient} : The player ${message.author.displayName} has been promoted`, 'party');
      } else {
        await botClient.party.me.promote(username);
        showInfo(`${usedClient} : The player ${username} has been promoted`, 'party');
      }
    } catch (err) {
      showError('Error promoting player', err);
    }
};

module.exports = handlePromoteCommand;
