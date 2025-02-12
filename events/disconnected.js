const showInfo = require('../utils/logs/showInfo')
const postStatus = require('../client/postStatus')

function cloneData(data) {
    return { ...data };
}

async function handleDisconnected(botClient) {
    showInfo("❌ The client is disconnected !", 'client');
    const friendsList = Array.from(botClient.friend.list.values());
    const friendNames = friendsList.map(friend => friend._displayName);
    
    data = {
        username: botClient.user.self.displayName,
        status: "Offline",
        friends: friendNames.length,
        party: "offline",
        matchmaking: "offline",
        timestamp: new Date().toISOString()
    };
    await postStatus(cloneData(data))
}

module.exports = handleDisconnected