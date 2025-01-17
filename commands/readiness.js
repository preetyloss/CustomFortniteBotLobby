const showInfo = require('../utils/sys/showInfo')

module.exports = async (m) => {
    const usedClient = m.client.user.self.displayName
    const ready = true

    await m.client.party.me.setReadiness(ready);
    await showInfo(`${usedClient} : Set readiness to ${ready}!`, 'commandInfo');
};