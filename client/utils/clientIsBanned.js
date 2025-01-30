const nconf = require('nconf');
const config = nconf.file({ file: 'config.json' });

const handleClientIsBanned = async (botClient) => {
    await botClient.setStatus(nconf.get('client:status:matchmaking_banned'))
    await botClient.party.me.clearEmote()
    await botClient.party.me.setEmote('EID_Wave');

    if (!nconf.get('fortnite:banned_matchmaking')) {
        nconf.set('fortnite:banned_matchmaking', true);

        nconf.save((err) => {
            if (err) {
                console.error('Error saving configuration:', err);
            } else {
                console.log('Configuration updated successfully.');
            }
        });
    }
};

module.exports = handleClientIsBanned;