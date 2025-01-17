const nconf = require('nconf');
nconf.file({ file: './config.json' });

let defaultTextColor = nconf.get('logs:defaultText');
let systemMessageColor = nconf.get('logs:systemMessage');
let partyInfoColor = nconf.get('logs:partyInfo');
let clientInfoColor = nconf.get('logs:clientInfo');
let commandInfoColor = nconf.get('logs:commandInfo');

if (!defaultTextColor || defaultTextColor === "") {
    defaultTextColor = "white";
}
if (!systemMessageColor || systemMessageColor === "") {
    systemMessageColor = "green";
}
if (!partyInfoColor || partyInfoColor === "") {
    partyInfoColor = "yellow";
}
if (!clientInfoColor || clientInfoColor === "") {
    clientInfoColor = "blue";
}
if (!commandInfoColor || commandInfoColor === "") {
    commandInfoColor = "cyan";
}

module.exports = async () => {
    const message = 'The log colors have been defined successfully'
    const loadingMessage = 'You have to wait a little while for the client to connect...'
    
    console.log(message[systemMessageColor]);
    console.log(loadingMessage[systemMessageColor])  
    return {
        defaultTextColor,
        systemMessageColor,
        partyInfoColor,
        clientInfoColor,
        commandInfoColor
    };
};
