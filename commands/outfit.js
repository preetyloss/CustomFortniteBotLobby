const { fetchCosmetic } = require('../utils/outfit/api');
const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');

nconf.file({ file: './config.json' });
const defaultOutfit = nconf.get('client:outfit').skin

const handleSetBackpackCommand = async (message, botClient) => {
    const usedClient = botClient.user.self.displayName;
    
    const commandMatch = message.content.match(/^bot@(\w+)\s+(.+)/);
    if (commandMatch) {
        const command = commandMatch[1];
        const skinName = commandMatch[2];

        if (command === 'outfit') {
            let access = 'commands:' + command;
            const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
            if (nconf.get(access) === 'admin_only') {
                if (!admins.includes(message.author.id)) {
                    showError(`${usedClient} : You don't have permission to use this command.`);
                    return;
                }
                if (!skinName) {
                    showError(`${usedClient} : The skin wasn't found!`);
                    return;
                }
                try {
                    const skin = await fetchCosmetic(skinName, 'outfit');
                    if (skinName !== "default") {
                        await botClient.party.me.setOutfit(skin.id);
                        showInfo(`${usedClient} : Set the skin to ${skin.name}!`, 'commandInfo');
                    } else {
                        await botClient.party.me.setOutfit(defaultOutfit)
                        showInfo(`${usedClient} : Set default outfit`, 'commandInfo')
                    }
                } catch (err) {
                    showError('error setting outfit', err);
                }
            } else {
                if (!skinName) {
                    showError(`${usedClient} : The skin wasn't found!`);
                    return;
                }
                try {
                    const skin = await fetchCosmetic(skinName, 'outfit');
                    if (skinName !== "default") {
                        await botClient.party.me.setOutfit(skin.id);
                        showInfo(`${usedClient} : Set the skin to ${skin.name}!`, 'commandInfo');
                    } else {
                        await botClient.party.me.setOutfit(defaultOutfit)
                        showInfo(`${usedClient} : Set default outfit`, 'commandInfo')
                    }
                } catch (err) {
                    showError('error setting outfit', err);
                }
            }
        }
    }
};

module.exports = handleSetBackpackCommand;