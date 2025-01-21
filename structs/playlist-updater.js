const axios = require('axios');
const fs = require('fs');
const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const playlists_url = 'https://fortnite-api.com/v1/playlists';

function updatePlaylists() {
    axios.get(playlists_url)
        .then(response => {
            const playlists = response.data.data;
            const playlistIds = playlists.map(playlist => playlist.id.toLowerCase());

            const content = `module.exports.allowedPlaylists = Object.freeze([\n    "${playlistIds.join('",\n    "')}"\n])\n\nmodule.exports.websocketHeaders = Object.freeze({\n   'Accept-Version': '*',\n   'Pragma': 'no-cache',\n   'Cache-Control': 'no-cache'\n})\n`;

            fs.writeFileSync('utils/constants.js', content, 'utf8');
            showInfo('[Playlists] Playlists Updated', 'sysMessage');
        })
        .catch(error => {
            showError('[Playlists] Error:', error);
        });
}

module.exports = updatePlaylists;
