const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');
const config = nconf.file({ file: 'config.json' });

const handleAddFriendCommand = async (message, botClient) => {
    const usedClient = botClient.user.self.displayName;
    
    const commandMatch = message.content.match(/^bot@(\w+)\s+(\w+)/);
    if (commandMatch) {
        const command = commandMatch[1];
        const username = commandMatch[2];
        
        if (command === 'addFriend') {
            let access = 'commands:' + command;
            if (nconf.get(access) === 'admin_only') {
                if (message.author.id !== nconf.get('owner')) {
                    showError(`${usedClient} : You don't have permission to use this command.`);
                    return;
                }
                if (!username) {
                    showError(`${usedClient} : No username provided after "bot@addFriend".`);
                    return;
                }
                try {
                    if (botClient.friend && botClient.friend.add) {
                        await botClient.friend.add(username);
                        showInfo(`${usedClient} : A friend request has been sent to ${username}.`, 'commandInfo');
                    } else {
                        showError(`${usedClient} : The client does not support friend requests.`);
                    }
                } catch (error) {
                    showError('Error sending friend request:', error);
                }
                return;
            } else {
                if (!username) {
                    showError(`${usedClient} : No username provided after "bot@addFriend".`);
                    return;
                }
                try {
                    if (botClient.friend && botClient.friend.add) {
                        await botClient.friend.add(username);
                        showInfo(`${usedClient} : A friend request has been sent to ${username}.`, 'commandInfo');
                    } else {
                        showError(`${usedClient} : The client does not support friend requests.`);
                    }
                } catch (error) {
                    showError('Error sending friend request:', error);
                }
                return;
            }
        }
    }
};

module.exports = handleAddFriendCommand;