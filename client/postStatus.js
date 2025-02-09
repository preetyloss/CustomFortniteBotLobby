const showInfo = require('../utils/logs/showInfo');

async function postStatus(data) {
    console.log(data)
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
