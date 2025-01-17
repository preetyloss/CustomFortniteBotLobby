const showInfo = require('../utils/sys/showInfo')
const nconf = require('nconf');

nconf.file({ file: './config.json' });
const is_this_command_avaible = nconf.get('optional:help_command')
const version = nconf.get('DarkDus:version')
let message = `Dark Dus - A Custom Fortnite Bot ${version} \n Commands: \n - bot@inviteFriend \n - bot@kick \n - bot@changeGamemode \n - bot@addFriend \n - bot@logout \n - bot@changeStatus \n - bot@backpack \n - bot@pickaxe \n - bot@outfit \n - bot@promote \n - bot@level \n - bot@ready \n - bot@battlepass \n - bot@emote \n - bot@stopEmote \n - bot@help`

module.exports = async (m) => {
  const usedClient = m.client.user.self.displayName
  if (is_this_command_avaible !== "disabled") {
    await showInfo(`${usedClient} : The help has been used!`, 'commandInfo');
  }
};