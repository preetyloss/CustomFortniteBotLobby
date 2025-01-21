const showInfo = require('../utils/logs/showInfo');
const commands = {
  addFriend: require('../commands/addfriend'),
  backpack: require('../commands/backpack'),
  battlepass: require('../commands/battlepass'),
  changegamemode: require('../commands/changegamemode'),
  emote: require('../commands/emote'),
  help: require('../commands/help'),
  invitefriend: require('../commands/invitefriend'),
  kick: require('../commands/kick'),
  level: require('../commands/level'),
  logout: require('../commands/logout'),
  outfit: require('../commands/outfit'),
  pickaxe: require('../commands/pickaxe'),
  promote: require('../commands/promote'),
  setstatus: require('../commands/setstatus'),
  stopemote: require('../commands/stopemote'),
};

const handleCommands = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;
  showInfo(`${message.sender.displayName}: ${message.content}`, 'party');

  const commandMatch = message.content.match(/^bot@(\w+)/);
  if (commandMatch) {
    const command = commandMatch[1];

    if (commands[command]) {
      try {
        await commands[command](message, botClient);
      } catch (error) {
        console.error(`Erreur lors de l'exécution de la commande ${command}:`, error);
      }
    } else {
      console.log(`Command : ${command}`);
    }
  }
};

module.exports = handleCommands;
