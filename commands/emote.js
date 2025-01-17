const { fetchCosmetic, getCosmeticPath } = require('../utils/api');
const showError = require('../utils/sys/showError')
const showInfo = require('../utils/sys/showInfo')

module.exports = async (m, args) => {
  const usedClient = m.client.user.self.displayName
  const emote = await fetchCosmetic(args.join(' '), 'emote');

  if (!emote) {
    await showError(`${usedClient} : The emote ${args.join(' ')} wasn't found!`);
    return;
  }

  await m.client.party.me.setEmote(emote.id, getCosmeticPath(emote.path));
  await showInfo(`${usedClient} : Set the emote to ${emote.name}!`, 'commandInfo');
};