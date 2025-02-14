const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');
nconf.file({ file: 'config.json' });

const handleBattlepassCommand = async (message, botClient) => {
    const usedClient = botClient.user.self.displayName;

    const commandMatch = message.content.match(/^bot@battlepass\s+(\w+)\s+(\w+)/);
    if (!commandMatch) return;

    const purchased = commandMatch[1];
    const level = commandMatch[2];

    const accessLevel = nconf.get('commands:battlepass');
    const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
    const isAdminOnly = accessLevel === 'admin_only';
    const isAdmin = admins.includes(message.author.id) || admins.includes(message.author.displayName);

    if (isAdminOnly && !isAdmin) {
        showError(`${usedClient} : You don't have permission to use this command.`);
        return;
    }

    if (!purchased || !level) {
        showError(`${usedClient} : Invalid battlepass info supplied for "bot@battlepass".`);
        return;
    }

    try {
        await botClient.party.me.setBattlepass(purchased, level);
        showInfo(`${usedClient} : Set the battlepass info to:\nIs Purchased: ${purchased}\nBP Level: ${level}`, 'commandInfo');
    } catch (error) {
        showError(`${usedClient} : Error setting battlepass: ${error.message}`);
    }
};

module.exports = handleBattlepassCommand;
