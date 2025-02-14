const showInfo = require('../logs/showInfo')

async function checkAPIStatus() {
    const response = await fetch(`https://darkdus-client-status.vercel.app/api/internal`, {
        method: 'GET',
    });

    const data = await response.json();
    if (data.isAvailable) {
        showInfo(`The API is available`, 'green');
    } else {
        console.log('\x1b[31m%s\x1b[0m', '------------------------------------------------------')
        console.log('\x1b[31m%s\x1b[0m', 'WARNING! : The API is offline for the momement')
        console.log('\x1b[31m%s\x1b[0m', `RAISON: ${data.raison}`)
        console.log('\x1b[31m%s\x1b[0m', '------------------------------------------------------')
    }
}

module.exports = checkAPIStatus