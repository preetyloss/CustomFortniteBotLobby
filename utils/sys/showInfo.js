const axios = require('axios');
const show = require('./show');
const initColors = require('../../client/initColors.js');
require('colors');
const nconf = require('nconf');
const dotenv = require('dotenv');

dotenv.config();

nconf.env()
const webhookUrl = nconf.get('DISCORD_WEBHOOK')

let systemMessageColor, partyInfoColor, clientInfoColor, commandInfoColor, defaultTextColor;

initColors().then(({ 
    systemMessageColor: sysColor, 
    partyInfoColor: partyColor,  
    clientInfoColor: clientColor,
    commandInfoColor: commandColor,
    defaultTextColor: defColor
}) => {
    systemMessageColor = sysColor;
    partyInfoColor = partyColor;
    clientInfoColor = clientColor;
    commandInfoColor = commandColor;
    defaultTextColor = defColor;
});

const showInfo = async (m, type) => {
    const MessageContent = '[INFO] ' + m;

    if (!type) {
        if (!webhookUrl || webhookUrl === "") {
            console.log(MessageContent[defaultTextColor]);
        } else {
            const embed = {
                title: "[DarkDus]",
                description: "```[INFO] " + m + "```",
                color: 0x00FF00,
                timestamp: new Date().toISOString()
            };
            const payload = {
                username: "[DarkDus] A Custom Fortnite Bot",
                embeds: [embed]
            };

            try {
                await axios.post(webhookUrl, payload);
                show(MessageContent[defaultTextColor]);
            } catch (error) {
                console.error("[ERR] WEBHOOK ", error);
            }
        }
    } else if (type === 'sysMessage') {
        const sysMessageContent = '>>> ' + m;
        console.log(sysMessageContent[systemMessageColor]);

    } else if (type === 'party') {
        const partyMessageContent = '[PARTY] ' + m;
        if (!webhookUrl) {
            console.log(partyMessageContent[partyInfoColor]);
        } else {
            const embed = {
                title: "[DarkDus]",
                description: "```[PARTY] " + m + "```",
                color: 0x00FF00,
                timestamp: new Date().toISOString()
            };

            const payload = {
                username: "[DarkDus] A Custom Fortnite Bot",
                embeds: [embed]
            };

            try {
                await axios.post(webhookUrl, payload);
                show(partyMessageContent[partyInfoColor]);
            } catch (error) {
                console.error("[ERR] WEBHOOK ", error);
            }
        }
    } else if (type === 'clientInfo') {
        const clientInfoMessageContent = '[CLIENT] ' + m;
        if (!webhookUrl) {
            console.log(clientInfoMessageContent[clientInfoColor]);
        } else {
            const embed = {
                title: "[DarkDus]",
                description: "```[CLIENT] " + m + "```",
                color: 0x00FF00,
                timestamp: new Date().toISOString()
            };

            const payload = {
                username: "[DarkDus] A Custom Fortnite Bot",
                embeds: [embed]
            };

            try {
                await axios.post(webhookUrl, payload);
                show(clientInfoMessageContent[clientInfoColor]);
            } catch (error) {
                console.error("[ERR] WEBHOOK ", error);
            }
        }
    } else if (type === 'commandInfo') {
        const commandInfoMessageContent = '[COMMANDS] ' + m;
        if (!webhookUrl) {
            console.log(commandInfoMessageContent[commandInfoColor]);
        } else {
            const embed = {
                title: "[DarkDus]",
                description: "```[COMMANDS] " + m + "```",
                color: 0x00FF00,
                timestamp: new Date().toISOString()
            };

            const payload = {
                username: "[DarkDus] A Custom Fortnite Bot",
                embeds: [embed]
            };

            try {
                await axios.post(webhookUrl, payload);
                show(commandInfoMessageContent[commandInfoColor]);
            } catch (error) {
                console.error("[ERR] WEBHOOK ", error);
            }
        }
    }
};

module.exports = showInfo;