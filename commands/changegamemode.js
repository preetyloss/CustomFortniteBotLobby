const showError = require('../utils/sys/showError')
const showInfo = require('../utils/sys/showInfo')

module.exports = async (m, args) => {
  const usedClient = m.client.user.self.displayName
  const gamemode = args.join(' ')

  if (!gamemode) {
    await showError(`${usedClient} : The gamemode wasn't found!`);
    return;
  }

  await m.client.party.me.setPlaylist(gamemode)
  await showInfo(`${usedClient} : The gamemode has been updated`, 'commandInfo');
};

