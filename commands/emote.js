const { fetchCosmetic } = require('../utils/outfit/api');
const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');
const config = nconf.file({ file: 'config.json' });

const handleSetEmoteCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;
  
  const commandMatch = message.content.match(/^bot@(\w+)\s+(\w+)/);
  if (commandMatch) {
    const command = commandMatch[1];
    const emoteName = commandMatch[2];
    
    if (command === 'emote') {
      let access = 'commands:' + command;
      if (nconf.get(access) === 'admin_only') {
        if (message.author.id !== nconf.get('owner')) {
          showError(`${usedClient} : You don't have permission to use this command.`);
          return;
        }
        if (!emoteName) {
          showError(`${usedClient} : No emote provided after "bot@emote".`);
          return;
        }
        try {
          const emote = await fetchCosmetic(emoteName, 'emote');
          await botClient.party.me.setEmote(emote.id);
          showInfo(`${usedClient} : Set the emote to ${emote.name}!, 'commandInfo'`);
        } catch (error) {
          showError(`${usedClient} : Error setting emote - ${error.message}`);
        }
      } else {
        if (!emoteName) {
          showError(`${usedClient} : No emote provided after "bot@emote".`);
          return;
        }
        try {
          const emote = await fetchCosmetic(emoteName, 'emote');
          await botClient.party.me.setEmote(emote.id);
          showInfo(`${usedClient} : Set the emote to ${emote.name}!, 'commandInfo'`);
        } catch (error) {
          showError(`${usedClient} : Error setting emote - ${error.message}`);
        }
      }

    }
  }
};

module.exports = handleSetEmoteCommand;