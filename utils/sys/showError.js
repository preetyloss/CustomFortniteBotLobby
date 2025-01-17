const axios = require('axios');
const nconf = require('nconf');
const show = require('./show')
require('colors');

const dotenv = require('dotenv');

dotenv.config();

nconf.env()
const webhookUrl = nconf.get('DISCORD_WEBHOOK')

const showError = async (m) => {
    const message = '[ERR]' + m
    if (webhookUrl === "" || !webhookUrl) {
        show(message.red)
    } else {
        const embed = {
            title: "[BLUCK]",
            description: message,
            color: 0xFF0000,
            timestamp: new Date().toISOString()
        };

        const payload = {
            username: "[DarkDus] A Custom Fortnite Bot",
            embeds: [embed]
        };

        axios.post(webhookUrl, payload)
            .then(() => show(message.red))
            .catch((error) => console.error("[ERR] WEBHOOK ", error));
    }
};

module.exports = showError;