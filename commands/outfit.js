const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');

nconf.file({ file: './config.json' });
const defaultOutfit = nconf.get('client:outfit:skin')

const handleSetBackpackCommand = async (message, botClient) => {
    const usedClient = botClient.user.self.displayName;
    const commandMatch = message.content.match(/^bot@outfit\s+(.+)/);

    if (!commandMatch) return;

    const skinName = commandMatch[1].trim();
    const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
    const accessLevel = nconf.get('commands:outfit');

    if (accessLevel === 'admin_only' && !admins.includes(message.author.id) && !admins.includes(message.author.displayName)) {
        showError(`${usedClient} : You don't have permission to use this command.`);
        return;
    }

    if (!skinName) {
        showError(`${usedClient} : The skin wasn't found!`);
        return;
    }

    try {
        if (skinName !== "default") {
            await botClient.party.me.setOutfit(skinName);
            showInfo(`${usedClient} : Set the skin to ${skinName}!`, 'commandInfo');
        } else {
            await botClient.party.me.setOutfit(defaultOutfit);
            showInfo(`${usedClient} : Set default outfit`, 'commandInfo');
        }
    } catch (err) {
        showError(`${usedClient} : Error setting outfit`, err);
    }
};

module.exports = handleSetBackpackCommand;