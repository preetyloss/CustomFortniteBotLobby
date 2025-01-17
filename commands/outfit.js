const { fetchCosmetic } = require('../utils/api');
const showError = require('../utils/sys/showError')
const showInfo = require('../utils/sys/showInfo')
const nconf = require('nconf');

nconf.file({ file: './config.json' });
const defaultOutfit = nconf.get('client:outfit').skin

module.exports = async (m, args) => {
  const usedClient = m.client.user.self.displayName
  const skin = await fetchCosmetic(args.join(' '), 'outfit');

  if (!skin) {
    await showError(`${usedClient} : The skin ${args.join(' ')} wasn't found!`);
    return;
  }

  if (skin !== "default") {
      await m.client.party.me.setOutfit(skin.id);
      await showInfo(`${usedClient} : Set the skin to ${skin.name}!`, 'commandInfo');
  } else {
      await m.client.party.me.setOutfit(defaultOutfit)
      await showInfo(`${usedClient} : Set default outfit`, 'commandInfo')
  }
};