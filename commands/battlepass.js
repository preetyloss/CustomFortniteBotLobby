const showError = require('../utils/sys/showError')
const showInfo = require('../utils/sys/showInfo')

module.exports = async (m, args) => {
    const usedClient = m.client.user.self.displayName
    const purchased = args[0]
    const level = args[1]

    if (!args[0] || !args[1]) {
        await showError(`${usedClient} : No battlepass info supplied!`);
        return;
    }

    await m.client.party.me.setBattlepass(purchased, level, undefined, undefined);
    await showInfo(`${usedClient} : Set the battlepass info to: \nIs Purchased: ${purchased}\nBP Level: ${level}`, 'commandInfo');
};