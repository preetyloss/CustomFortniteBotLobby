const showInfo = require('../utils/logs/showInfo');

const handlePartyMessages = async (message, sender) => {
    showInfo(`${sender.displayName}: ${message.content}`, 'party');
}

module.exports = handlePartyMessages;