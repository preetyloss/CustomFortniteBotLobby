const showInfo = require('../utils/logs/showInfo');
const nconf = require('nconf');
require('dotenv').config();
const config = nconf.argv().env().file({ file: 'config.json' });
const key = nconf.get('DARKDUS_API_KEY')

async function postStatus(data) {
    if (!nconf.get('system:useStatusAPI')) return;

    data.key = key;
    try {
        const response = await fetch("https://darkdus-client-status.vercel.app/api/status", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            showInfo('Post request successfully', 'client');
        } else {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
    } catch (error) {}
}

module.exports = postStatus;
