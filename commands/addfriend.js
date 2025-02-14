const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');
const config = nconf.file({ file: 'config.json' });

const handleAddFriendCommand = async (message, botClient) => {
    const usedClient = botClient.user.self.displayName;

    const commandMatch = message.content.match(/^bot@addFriend\s+(\w+)/);
    if (!commandMatch) return;

    const username = commandMatch[1].trim();
    const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
    const accessLevel = nconf.get('commands:addFriend');
    const isAdminOnly = accessLevel === 'admin_only';

    const isAdmin = admins.includes(message.author.id) || admins.includes(message.author.displayName);

    if (isAdminOnly && !isAdmin) {
        showError(`${usedClient} : You don't have permission to use this command.`);
        return;
    }

    if (!username) {
        showError(`${usedClient} : No username provided after "bot@addFriend".`);
        return;
    }

    try {
        if (botClient.friend?.add) {
            await botClient.friend.add(username);
            showInfo(`${usedClient} : A friend request has been sent to ${username}.`, 'commandInfo');
        } else {
            showError(`${usedClient} : The client does not support friend requests.`);
        }
    } catch (error) {
        showError(`${usedClient} : Error sending friend request to ${username}: ${error.message}`);
    }
};

module.exports = handleAddFriendCommand;
