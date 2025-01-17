const showError = require('../utils/sys/showError')
const showInfo = require('../utils/sys/showInfo')

module.exports = async (m, args) => {
  const usedClient = m.client.user.self.displayName
  const player = args.join(' ')

  if (!player) {
    await showError(`${usedClient} : The player wasn't found!`);
    return;
  }

  await m.client.party.invite(player);
  await showInfo(`${usedClient} : The player has been invited`, 'commandInfo');
};