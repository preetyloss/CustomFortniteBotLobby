const showError = require('../utils/logs/showError');
const showInfo = require('../utils/logs/showInfo');
const changeTimerStat = require('./changeTimerStat');
const nconf = require('nconf');
const config = nconf.file({ file: 'config.json' });

const handleMemberKicked = async (botClient, member, managePartySize) => {
  try {
    if (member.displayName !== botClient.user.self.displayName) {
      showInfo(`The player ${member.displayName} has been kicked`, 'party');
    } else {
      showInfo('The bot has been kicked', 'party');
      nconf.set('client:isKicked', true);
      nconf.save((err) => {
        if (err) {
          showError(`${usedClient} : Failed to save configuration.`);
          console.error(err);
        }
      });
      managePartySize(botClient);
      await changeTimerStat();
      try {
        await botClient.createParty();
        showInfo('Party recreated successfully', 'party');
      } catch (createPartyError) {
        showError(`Failed to recreate the party: ${createPartyError.message}`);
      }
    }
  } catch (error) {
    showError(`Failed to handle member kick: ${error.message}`);
  }
};

module.exports = handleMemberKicked;