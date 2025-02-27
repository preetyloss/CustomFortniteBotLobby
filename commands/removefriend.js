const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');

nconf.file({ file: 'config.json' });

const handleRemoveFriendCommand = async (message, botClient) => {
    const usedClient = botClient.user.self.displayName;
    
    const commandMatch = message.content.match(/^bot@removeFriend\s+(\w+)/);
    if (!commandMatch) return;

    const [_, friendId] = commandMatch;

    const access = `commands:removeFriend`;
    const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
    const isAdminOnly = nconf.get(access) === 'admin_only';
    const isAdmin = admins.includes(message.author.id) || admins.includes(message.author.displayName);

    if (isAdminOnly && !isAdmin) {
        showError(`${usedClient} : You don't have permission to use this command.`);
        return;
    }

    if (!friendId) {
        showError(`${usedClient} : No friend ID specified.`);
        return;
    }

    try {
        const friend = botClient.friend.list.get(friendId);

        if (!friend) {
            showError(`${usedClient} : Friend with ID "${friendId}" not found.`);
            return;
        }

        await friend.removeFriend();
        showInfo(`${usedClient} : Removed friend with ID "${friendId}".`, 'commandInfo');
    } catch (error) {
        showError(`${usedClient} : Failed to remove friend with ID "${friendId}": ${error.message}`);
    }
};

module.exports = handleRemoveFriendCommand;
