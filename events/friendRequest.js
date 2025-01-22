const showInfo = require('../utils/logs/showInfo');

const handleFriendRequest = async (botClient, request, webhookClient) => {
  const bannedPlayer = nconf.get('client:banned_player') || [];
  if (bannedPlayer.includes(request.displayName)) {
    showInfo(`${request.displayName} try to add the bot but he is banned...`)
    return
  }
  showInfo(`Received a friend request from ${request.displayName} ${request.id}`, 'party');
  await request.accept();
  showInfo(`Accepted friend request from ${request.displayName} ${request.id}`, 'party');
  webhookClient.send(`\`\`\`diff\n- [Bot] Accepted friend request from ${request.displayName} ${request.id}\`\`\``);
};

module.exports = handleFriendRequest;