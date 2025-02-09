const axios = require('axios');

async function getUserData(username) {
    try {
        const response = await axios.get('https://darkdus-client-status.vercel.app/api/status', {
            params: { username }
        });
        
        return response.data
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

module.exports = getUserData