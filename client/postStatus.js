const axios = require('axios');
const showInfo = require('../utils/logs/showInfo')
const showError = require('../utils/logs/showError')

async function postStatus(data) {
    try {
        const response = await axios.post("https://darkdus-client-status.vercel.app/api/status", data);
        showInfo('Post request successfully', 'client')
    } catch (error) {
        showError("❌ Error sending request:", error.message);
    }
}

module.exports = postStatus