const showError = require('../utils/sys/showError')
const showInfo = require('../utils/sys/showInfo')
const nconf = require('nconf');

nconf.file({ file: './config.json' });
const backpack = nconf.get('client:outfit').backpack
const skin = nconf.get('client:outfit').skin
let level = nconf.get('client:default').level

module.exports = async (client) => {
    if (!level) {
        level = "1"
        if (client.party && client.party.me) {
            client.party.me.setBackpack(backpack)
            client.party.me.setOutfit(skin)
            client.party.me.setLevel(level);
            showInfo('Client\'s outfit is ready!', 'clientInfo');
        } else {
            showError('Miss information (client.party and client.party.me)')
        }
    } else {
        if (client.party && client.party.me) {
            client.party.me.setBackpack(backpack)
            client.party.me.setOutfit(skin)
            client.party.me.setLevel(level);
            showInfo('Client\'s outfit is ready!', 'clientInfo');
            showInfo(`Client\'s default level is set (${level})`, 'clientInfo')
        } else {
            showError('Miss information (client.party and client.party.me)')
        }
    }

};