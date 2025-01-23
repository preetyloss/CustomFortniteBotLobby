const { fetchCosmetic } = require('../utils/outfit/api');
const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');
const config = nconf.file({ file: 'config.json' });

const handlePickaxeCommand = async (message, botClient) => {
    const usedClient = botClient.user.self.displayName;
    
    const commandMatch = message.content.match(/^bot@(\w+)\s+(.+)/);
    if (commandMatch) {
        const command = commandMatch[1];
        const pickaxeName = commandMatch[2];

        if (command === 'pickaxe') {
            let access = 'commands:' + command;
            const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
            if (nconf.get(access) === 'admin_only') {
                if (!admins.includes(message.author.id) || !admins.includes(message.author.displayName)) {
                    showError(`${usedClient} : You don't have permission to use this command.`);
                    return;
                }
                if (!pickaxeName) {
                    showError(`${usedClient} : The pickaxe wasn't found!`);
                    return;
                }
                try {
                    const pickaxe = await fetchCosmetic(pickaxeName, 'pickaxe');
                    await botClient.party.me.setPickaxe(pickaxe.id);
                    showInfo(`${usedClient} : Set the pickaxe to ${pickaxe.name}!`, 'commandInfo');
                } catch (err) {
                    showError('error setting pickaxe', err);
                }
            } else {
                if (!pickaxeName) {
                    showError(`${usedClient} : The pickaxe wasn't found!`);
                    return;
                }
                try {
                    const pickaxe = await fetchCosmetic(pickaxeName, 'pickaxe');
                    await botClient.party.me.setPickaxe(pickaxe.id);
                    showInfo(`${usedClient} : Set the pickaxe to ${pickaxe.name}!`, 'commandInfo');
                } catch (err) {
                    showError('error setting pickaxe', err);
                }
            }

        }
    }
};

module.exports = handlePickaxeCommand;