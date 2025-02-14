const { fetchCosmetic } = require('../utils/outfit/api');
const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');
nconf.file({ file: 'config.json' });

const handleSetEmoteCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;

  const commandMatch = message.content.match(/^bot@emote\s+(\w+)/);
  if (!commandMatch) return;

  const emoteName = commandMatch[1].trim();
  if (!emoteName) {
    showError(`${usedClient} : No emote provided after "bot@emote".`);
    return;
  }

  const accessLevel = nconf.get('commands:emote');
  const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
  const isAdminOnly = accessLevel === 'admin_only';
  const isAdmin = admins.includes(message.author.id) || admins.includes(message.author.displayName);

  if (isAdminOnly && !isAdmin) {
    showError(`${usedClient} : You don't have permission to use this command.`);
    return;
  }

  try {
    const emote = await fetchCosmetic(emoteName, 'emote');
    await botClient.party.me.setEmote(emote.id);
    showInfo(`${usedClient} : Set the emote to ${emote.name}!`, 'commandInfo');
  } catch (error) {
    showError(`${usedClient} : Error setting emote - ${error.message}`);
  }
};

module.exports = handleSetEmoteCommand;
