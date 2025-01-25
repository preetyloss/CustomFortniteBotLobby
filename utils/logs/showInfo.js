const axios = require('axios');
const show = require('./show.js');
const initColors = require('../../client/initColors.js');
require('colors');
const nconf = require('nconf');
const dotenv = require('dotenv');

dotenv.config();

nconf.env();
const webhookUrl = nconf.get('DISCORD_WEBHOOK');

let systemMessageColor, partyInfoColor, clientInfoColor, commandInfoColor, defaultTextColor;
let colorsInitialized = false;

const initializeColors = async () => {
    if (colorsInitialized) return;
    try {
        const colors = await initColors();
        systemMessageColor = colors.systemMessageColor || 'green';
        partyInfoColor = colors.partyInfoColor || 'yellow';
        clientInfoColor = colors.clientInfoColor || 'cyan';
        commandInfoColor = colors.commandInfoColor || 'magenta';
        defaultTextColor = colors.defaultTextColor || 'white';
        colorsInitialized = true;
    } catch (error) {
        console.error('[ERR] Failed to initialize colors:', error);
        systemMessageColor = 'green';
        partyInfoColor = 'yellow';
        clientInfoColor = 'cyan';
        commandInfoColor = 'magenta';
        defaultTextColor = 'white';
    }
};

const showInfo = async (m, type) => {
    await initializeColors();
    const MessageContent = '[INFO] ' + m;

    if (!type) {
        if (!webhookUrl) {
            console.log(MessageContent[defaultTextColor] || MessageContent);
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
                show(MessageContent[defaultTextColor] || MessageContent);
            } catch (error) {
                console.error("[ERR] WEBHOOK ", error);
            }
        }
    } else if (type === 'sysMessage' || type === 'green') {
        const sysMessageContent = '>>> ' + m;
        console.log(sysMessageContent[systemMessageColor] || sysMessageContent);

    } else if (type === 'party') {
        const partyMessageContent = '[PARTY] ' + m;
        if (!webhookUrl) {
            console.log(partyMessageContent[partyInfoColor] || partyMessageContent);
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
                show(partyMessageContent[partyInfoColor] || partyMessageContent);
            } catch (error) {
                console.error("[ERR] WEBHOOK ", error);
            }
        }
    } else if (type === 'clientInfo') {
        const clientInfoMessageContent = '[CLIENT] ' + m;
        if (!webhookUrl) {
            console.log(clientInfoMessageContent[clientInfoColor] || clientInfoMessageContent);
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
                show(clientInfoMessageContent[clientInfoColor] || clientInfoMessageContent);
            } catch (error) {
                console.error("[ERR] WEBHOOK ", error);
            }
        }
    } else if (type === 'commandInfo') {
        const commandInfoMessageContent = '[COMMANDS] ' + m;
        if (!webhookUrl) {
            console.log(commandInfoMessageContent[commandInfoColor] || commandInfoMessageContent);
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
                show(commandInfoMessageContent[commandInfoColor] || commandInfoMessageContent);
            } catch (error) {
                console.error("[ERR] WEBHOOK ", error);
            }
        }
    }
};

module.exports = showInfo;