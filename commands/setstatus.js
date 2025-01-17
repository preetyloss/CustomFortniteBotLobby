const showError = require('../utils/sys/showError')
const showInfo = require('../utils/sys/showInfo')

module.exports = async (m, args) => {
  const usedClient = m.client.user.self.displayName
  const status = args.join(' ')

  if (!status) {
    await showError(`${usedClient} : The status wasn't found!`);
    return;
  }

  await m.client.setStatus(status);
  await showInfo(`${usedClient} : The status has been changed to ${status}`, 'commandInfo');
};