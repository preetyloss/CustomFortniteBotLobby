const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');
const config = nconf.file({ file: 'config.json' });

const handleBattlepassCommand = async (message, botClient) => {
    const usedClient = botClient.user.self.displayName;
    
    const commandMatch = message.content.match(/^bot@(\w+)\s+(\w+)\s+(\w+)/);
    if (commandMatch) {
        const command = commandMatch[1];
        const purchased = commandMatch[2];
        const level = commandMatch[3];
        
        if (command === 'battlepass') {
            let access = 'commands:' + command;
            if (nconf.get(access) === 'admin_only') {
                if (message.author.id !== nconf.get('owner')) {
                    showError(`${usedClient} : You don't have permission to use this command.`);
                    return;
                }
                if (!purchased || !level) {
                    showError(`${usedClient} : No battlepass info supplied for "bot@battlepass".`);
                    return;
                }
                try {
                    await botClient.party.me.setBattlepass(purchased, level, undefined, undefined);
                    showInfo(`${usedClient} : Set the battlepass info to: \nIs Purchased: ${purchased}\nBP Level: ${level}`, 'commandInfo');
                } catch (error) {
                    showError('Error setting battlepass:', error);
                }
            } else {
                if (!purchased || !level) {
                    showError(`${usedClient} : No battlepass info supplied for "bot@battlepass".`);
                    return;
                }
                try {
                    await botClient.party.me.setBattlepass(purchased, level, undefined, undefined);
                    showInfo(`${usedClient} : Set the battlepass info to: \nIs Purchased: ${purchased}\nBP Level: ${level}`, 'commandInfo');
                } catch (error) {
                    showError('Error setting battlepass:', error);
                }
            }
        }
    }
};

module.exports = handleBattlepassCommand;