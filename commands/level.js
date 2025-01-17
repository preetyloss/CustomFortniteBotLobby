const showError = require('../utils/sys/showError')
const showInfo = require('../utils/sys/showInfo')

module.exports = async (m, args) => {
    const usedClient = m.client.user.self.displayName
    const level = args[0]

    if (!level) {
        await showError(`${usedClient} : No level specified!`);
        return;
    }

    await m.client.party.me.setLevel(level);
    await showInfo(`${usedClient} : Set the level to ${level}!`, 'commandInfo');
};