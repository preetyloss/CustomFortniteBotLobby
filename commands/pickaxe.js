const { fetchCosmetic } = require('../utils/api');
const showError = require('../utils/sys/showError')
const showInfo = require('../utils/sys/showInfo')

module.exports = async (m, args) => {
  const usedClient = m.client.user.self.displayName
  const pickaxe = await fetchCosmetic(args.join(' '), 'pickaxe');

  if (!pickaxe) {
    await showError(`${usedClient} : The pickaxe ${args.join(' ')} wasn't found!`);
    return;
  }

  await m.client.party.me.setPickaxe(pickaxe.id);
  await showInfo(`${usedClient} : Set the pickaxe to ${pickaxe.name}!`, 'commandInfo');
};