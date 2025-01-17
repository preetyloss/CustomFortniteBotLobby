const addfriendCommand = require('../commands/addfriend')
const backpackCommand = require('../commands/backpack');
const battlepassCommand = require('../commands/battlepass');
const changegamemodeCommand = require('../commands/changegamemode')
const emoteCommand = require('../commands/emote');
const helpCommand = require('../commands/help')
const invitefriendCommand = require('../commands/invitefriend')
const kickCommand = require('../commands/kick');
const levelCommand = require('../commands/level');
const logoutCommand = require('../commands/logout')
const outfitCommand = require('../commands/outfit');
const pickaxeCommand = require('../commands/pickaxe');
const promoteCommand = require('../commands/promote')
const readyCommand = require('../commands/readiness');
const setstatusCommand = require('../commands/setstatus')
const stopemoteCommand = require('../commands/stopemote')
const versionCommand = require('../commands/version')
const showError = require('./sys/showError');
const nconf = require('nconf');

nconf
  .file({ file: './config.json' });

const handleCommand = async (m) => {
    let prefix = nconf.get('client:prefix')
    if (!prefix || prefix === "") { prefix = "bot@" }
    if (!m.content.startsWith(prefix)) return;
  
    const args = m.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

  switch (command) {
    case 'addFriend':
        await addfriendCommand(m, args)
        break
    case 'backpack':
        await backpackCommand(m, args);
        break;
    case 'battlepass':
        await battlepassCommand(m, args);
        break;
    case 'changeGamemode':
        await changegamemodeCommand(m, args)
        break
    case 'emote':
        await emoteCommand(m, args);
        break;
    case 'help':
        await helpCommand(m)
        break
    case 'inviteFriend':
        await invitefriendCommand(m, args)
        break
    case 'kick':
        await kickCommand(m, args)
        break
    case 'level':
        await levelCommand(m, args);
        break;
    case 'logout':
        await logoutCommand(m)
        break
    case 'outfit':
        await outfitCommand(m, args);
        break;
    case 'pickaxe':
        await pickaxeCommand(m, args);
        break;
    case 'promote':
        await promoteCommand(m, args)
        break
    case 'ready':
        await readyCommand(m, args);
        break;
    case 'setStatus':
        await setstatusCommand(m, args)
        break
    case 'stopEmote':
        await stopemoteCommand(m)
        break
    case 'version':
        await versionCommand(m)
        break
    default:
        showError(`Command not recognized!`)
  }
};

module.exports = handleCommand;