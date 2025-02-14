const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');
nconf.file({ file: 'config.json' });

const handleClearFriendsCommand = async (message, botClient) => {
    const usedClient = botClient.user.self.displayName;

    const commandMatch = message.content.match(/^bot@clearFriends/);
    if (!commandMatch) return;

    const accessLevel = nconf.get('commands:clearFriends');
    const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
    const isAdminOnly = accessLevel === 'admin_only';
    const isAdmin = admins.includes(message.author.id) || admins.includes(message.author.displayName);

    if (isAdminOnly && !isAdmin) {
        showError(`${usedClient} : You don't have permission to use this command.`);
        return;
    }

    try {
        const friendsList = Array.from(botClient.friend.list.values());

        if (friendsList.length === 0) {
            showInfo(`${usedClient} : No friends to remove.`, 'commandInfo');
            return;
        }

        for (const friend of friendsList) {
            try {
                await botClient.friend.removeFriend(friend.id);
                showInfo(`${usedClient} : Removed friend ${friend.displayName}`, 'commandInfo');
            } catch (removeError) {
                showError(`${usedClient} : Failed to remove friend ${friend.displayName}: ${removeError.message}`);
            }
        }

        showInfo(`${usedClient} : All friends have been removed.`, 'commandInfo');
    } catch (error) {
        showError(`${usedClient} : Error removing friends: ${error.message}`);
    }
};

module.exports = handleClearFriendsCommand;
