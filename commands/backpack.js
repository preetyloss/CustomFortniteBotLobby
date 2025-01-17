const { fetchCosmetic } = require('../utils/api');
const showError = require('../utils/sys/showError')
const showInfo = require('../utils/sys/showInfo')
const nconf = require('nconf');

nconf.file({ file: './config.json' });
const defaultBackpack = nconf.get('client:outfit').backpack

module.exports = async (m, args) => {
    const usedClient = m.client.user.self.displayName
    const backpack = await fetchCosmetic(args.join(' '), 'backpack');

    if (!backpack) {
      await showError(`${usedClient} : The backpack ${args.join(' ')} wasn't found!`);
      return;
    }

    if (backpack !== "default") {
        await m.client.party.me.setBackpack(backpack.id);
        await showInfo(`${usedClient} : Set the backpack to ${backpack.name}!`, 'commandInfo');
    } else {
        await m.client.party.me.setBackpack(defaultBackpack)
        await showInfo(`${usedClient} : Set default backpack`, 'commandInfo')
    }
};