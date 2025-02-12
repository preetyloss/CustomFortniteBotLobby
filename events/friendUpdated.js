const getUserData = require('../client/getData');

function cloneData(data) {
    return { ...data };
}

async function handleFriendUpdated(botClient) {
    userData = getUserData(botClient.user.self.displayName)
    const friendsList = Array.from(botClient.friend.list.values());
    const friendNames = friendsList.map(friend => friend._displayName);
    
    data = {
      username: botClient.user.self.displayName,
      status: userData.status,
      friends: friendNames.length,
      party: userData.party,
      matchmaking: userData.matchmaking,
      timestamp: new Date().toISOString()
    };
    await postStatus(cloneData(data))
}

module.exports = handleFriendUpdated