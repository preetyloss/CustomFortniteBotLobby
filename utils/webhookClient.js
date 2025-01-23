const { WebhookClient } = require('discord.js');
const nconf = require('nconf');
const showInfo = require('./logs/showInfo');
const showError = require('./logs/showError');
const { send_webhook } = require('./../structs/config');

class WebhookClientWrapper {
    constructor() {
        this.webhookEnabled = (send_webhook);
        const url = process.env.DISCORD_WEBHOOK;

        if (this.webhookEnabled) {
            if (!url) {
                showError('[DISCORD] Webhook URL is not defined.', 'sysMessage');
                this.webhookEnabled = false;
            } else {
                showInfo('[DISCORD] Webhook is enabled', 'sysMessage');
                this.webhookClient = new WebhookClient({ url });
            }
        } else {
            showInfo('[DISCORD] Webhook is disabled', 'sysMessage');
        }
    }

    send(message) {
        if (this.webhookEnabled && this.webhookClient) {
            return this.webhookClient.send(message)
                .catch(err => showError('Error sending webhook:', err));
        } else {
            
        }
    }
}

module.exports = WebhookClientWrapper; 
