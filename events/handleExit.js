const showInfo = require('../utils/logs/showInfo')
const showError = require('../utils/logs/showError')
const postStatus = require('../client/postStatus')
const getUserData = require('../client/getData')

async function handleExit(botClient) {
    showInfo("🛑 Closing the bot in progress...", 'sysMessage');
    userData = getUserData(botClient.user.self.displayName)
    if (botClient) {
        data = {
            username: botClient.user.self.displayName,
            status: "Offline",
            party: "offline",
            matchmaking: "offline",
            timestamp: new Date().toISOString()
        };
        await postStatus(data);

        try {
            await botClient.logout();
            showInfo("✅ The bot is disconnected", 'client');
        } catch (error) {
            showError("❌ Error when disconnecting bot:", error);
        }
    }

    process.exit(0);
}

module.exports = handleExit