const showError = require('../utils/sys/showError')
const showInfo = require('../utils/sys/showInfo')

module.exports = async (m) => {
    const usedClient = m.client.user.self.displayName
    try { 
        await m.client.party.me.clearEmote()
        await m.client.leaveParty(false)
        await m.client.logout(); 
        showInfo(`${usedClient} : The bot is logged out`, 'commandInfo'); 
    } catch (error) { 
        showError('Error logging out:', error);
    } 
};