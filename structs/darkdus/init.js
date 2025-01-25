const https = require('https');
const fs = require('fs');
const path = require('path');

const actualVersion = 'https://raw.githubusercontent.com/DarkDusOfficial/CustomFortniteBotLobby/main/client/version.json';
const localFilePath = path.resolve(__dirname, '../../client/version.json');

function fetchRemoteFile(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                return reject(new Error(`HTTP Status: ${res.statusCode}`));
            }

            let data = '';
            res.on('data', chunk => (data += chunk));
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function readLocalFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

async function init() {
    try {
        const [remoteData, localData] = await Promise.all([
            fetchRemoteFile(actualVersion),
            readLocalFile(localFilePath),
        ]);

        const remoteJson = JSON.parse(remoteData);
        const localJson = JSON.parse(localData);

        if (remoteJson.version === localJson.version && remoteJson.CKey === localJson.CKey) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
        return undefined;
    }
}

module.exports = init;
