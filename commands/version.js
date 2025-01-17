const showInfo = require('../utils/sys/showInfo')
const show = require('../utils/sys/show')
const nconf = require('nconf');

nconf.file({ file: './config.json' });
const version = nconf.get('DarkDus:version')

module.exports = async (m) => {
    const usedClient = m.client.user.self.displayName
    await showInfo(`${usedClient} : Use of the command version`);
    await show(`[DarkDus] A Custom Fortnite Bot - Version ${version}`, 'commandInfo')
};