const showInfo = require('../utils/sys/showInfo')

module.exports = async (m) => {
  const usedClient = m.client.user.self.displayName
  await m.client.party.me.clearEmote()
  await showInfo(`${usedClient} : The emote has been stoped!`, 'commandInfo');
};