const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');

nconf.file({ file: './config.json' });
const defaultBackpack = nconf.get('client:outfit').backpack;

const handleSetBackpackCommand = async (message, botClient) => {
    const usedClient = botClient.user.self.displayName;
    const commandMatch = message.content.match(/^bot@backpack\s+(.+)/);
    if (!commandMatch) return;

    const backpackName = commandMatch[1].trim();
    const accessLevel = nconf.get('commands:backpack');
    const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
    const isAdminOnly = accessLevel === 'admin_only';
    const isAdmin = admins.includes(message.author.id) || admins.includes(message.author.displayName);

    if (isAdminOnly && !isAdmin) {
        showError(`${usedClient} : You don't have permission to use this command.`);
        return;
    }

    if (!backpackName) {
        showError(`${usedClient} : No backpack provided after "bot@backpack".`);
        return;
    }

    try {
        if (backpackName === 'default') {
            await botClient.party.me.setBackpack(defaultBackpack);
            showInfo(`${usedClient} : Set to the default backpack`, 'commandInfo');
        } else {
            await botClient.party.me.setBackpack(backpackName);
            showInfo(`${usedClient} : Set the backpack to ${backpackName}!`, 'commandInfo');
        }
    } catch (error) {
        showError(`${usedClient} : Error setting backpack: ${error.message}`);
    }
};

module.exports = handleSetBackpackCommand;
