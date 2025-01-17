const showError = require('../utils/sys/showError')
const showInfo = require('../utils/sys/showInfo')

module.exports = async (m, args) => {
    const usedClient = m.client.user.self.displayName
    const username = args[0]
                
    if (!username) {
        showError(`${usedClient} : No username provided after "bot@add".`);
        return;
    }

    try {
        if (m.client.friend && m.client.friend.add) {
            await m.client.friend.add(username);
            showInfo(`${usedClient} : A friend request has been sent to ${username}.`, 'commandInfo');
        } else {
            showError(`${usedClient} : The client does not support friend requests.`);
        }
    } catch (error) {
        showError('Error sending friend request:', error);
    }
    return;
};