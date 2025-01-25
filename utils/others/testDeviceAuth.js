const nconf = require('nconf');
require('dotenv').config();

nconf.argv().env().file({ file: 'config.json' });

const accountId = nconf.get('ACCOUNT_ID');
const deviceId = nconf.get('DEVICE_ID');
const secret = nconf.get('SECRET');

module.exports = async () => {
    const missingFields = [];
    
    if (!accountId) missingFields.push('accountId');
    if (!deviceId) missingFields.push('deviceId');
    if (!secret) missingFields.push('secret');
    
    if (missingFields.length > 0) {
        return `Missing ${missingFields.join(' & ')}`;
    } 
};
