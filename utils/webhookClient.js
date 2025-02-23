const { WebhookClient } = require('discord.js');
const nconf = require('nconf');
const showInfo = require('./logs/showInfo');
const showError = require('./logs/showError');

class WebhookClientWrapper {
    constructor() {
        this.webhookEnabled = nconf.get('discord:send_webhook');
        const url = process.env.DISCORD_WEBHOOK;

        if (!this.webhookEnabled) {
            this.status = 0;
            return;
        }

        if (!url) {
            this.status = -1;
            return;
        }

        this.webhookClient = new WebhookClient({ url });
        this.status = 1;
    }

    getStatus() {
        if (this.status === 1) {
            showInfo('Webhook enabled', 'sysMessage');
        } else if (this.status === -1) {
            showInfo('Webhook URL not defined', 'sysMessage');
        } else {
            showInfo('Webhook disabled', 'sysMessage');
        }
    }

    send(message) {
        if (this.webhookEnabled && this.webhookClient) {
            return this.webhookClient.send(message)
                .catch(err => showError('Error sending webhook:', err));
        }
    }
}

module.exports = WebhookClientWrapper;
