const { fetchCosmetic } = require('../utils/outfit/api');
const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');

nconf.file({ file: './config.json' });
const defaultBackpack = nconf.get('client:outfit').backpack;

const handleSetBackpackCommand = async (message, botClient) => {
    const usedClient = botClient.user.self.displayName;
    
    const commandMatch = message.content.match(/^bot@(\w+)\s+(.+)/);
    if (commandMatch) {
        const command = commandMatch[1];
        const backpackName = commandMatch[2];

        if (command === 'backpack') {
            let access = 'commands:' + command;
            const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
            if (nconf.get(access) === 'admin_only') {
                if (!admins.includes(message.author.id) || !admins.includes(message.author.displayName)) {
                    showError(`${usedClient} : You don't have permission to use this command.`);
                    return;
                }
                if (!backpackName) {
                    showError(`${usedClient} : No pack provided after "bot@setBackpack".`);
                    return;
                }

                if (backpackName !== "default") {
                    const backpack = await fetchCosmetic(backpackName, 'backpack');
                    try {
                        await botClient.party.me.setBackpack(backpack.id);
                        showInfo(`${usedClient} : Set the backpack to ${backpack.name}!`, 'commandInfo');
                    } catch (error) {
                        showError('error setting backpack', error);
                    }
                } else {
                    try {
                        await botClient.party.me.setBackpack(defaultBackpack);
                        showInfo(`${usedClient} : Set default backpack`, 'commandInfo');
                    } catch (error) {
                        showError('error setting backpack', error);
                    }
                }
            } else {
                if (!backpackName) {
                    showError(`${usedClient} : No pack provided after "bot@setBackpack".`);
                    return;
                }
                if (backpackName !== "default") {
                    const backpack = await fetchCosmetic(backpackName, 'backpack');
                    try {
                        await botClient.party.me.setBackpack(backpack.id);
                        showInfo(`${usedClient} : Set the backpack to ${backpack.name}!`, 'commandInfo');
                    } catch (error) {
                        showError('error setting backpack', error);
                    }
                } else {
                    try {
                        await botClient.party.me.setBackpack(defaultBackpack);
                        showInfo(`${usedClient} : Set default backpack`, 'commandInfo');
                    } catch (error) {
                        showError('error setting backpack', error);
                    }
                }
            }
        }
    }
};

module.exports = handleSetBackpackCommand;