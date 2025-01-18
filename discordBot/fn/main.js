const { Client } = require('fnbr');
const handleCommand = require('../../utils/party.js');
const showError = require('../../utils/sys/showError.js');
const showInfo = require('../../utils/sys/showInfo.js');
const initClient = require('../../client/initClient.js');
const nconf = require('nconf');
const dotenv = require('dotenv');
dotenv.config();

nconf
  .env()
  .file({ file: './config.json' });

const default_Status = nconf.get('client:status').default
const inUse_Status = nconf.get('client:status').inUse
const leave_time = nconf.get('client:leave_party_time_seconds')
let reload_time = nconf.get('client:reload_bot_time_seconds')
let clientInfoColor = nconf.get('logs:clientInfo');
if (!clientInfoColor || clientInfoColor === "") {
    clientInfoColor = "blue";
}

let inUse = false;
let partyTimerStart = false
let auth;
let client;
let partyLeaveTimer;

// A SLEEP FUNCTION
async function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

// TRY TO INIT THE CLIENT
async function InitFortniteClient() {
    try {
        await initClient(client);
        await updateStatus(client);
        await showInfo('The reload timer has started!', 'clientInfo');
        startReloadTimer(client);
    } catch (error) {}
}

// UPDATE THE STATUS
async function updateStatus () {
    await sleep(1.2)
    if (client.party && client.party.size > 1) {
        client.setStatus(inUse_Status);
        showInfo("Status is set to : " + inUse_Status, 'clientInfo')
    } else {
        client.setStatus(default_Status);
        showInfo("Status is set to : " + default_Status, 'clientInfo')
    }
};

// LIMIT THE TIME WHEN THE BOT IS IN A PARTY
async function partyTimer(seconds) {
    if (!seconds || seconds === "") return;
    
    const leaveParty = async () => {
        await sleep(2);
        if (client.party && client.party.size > 1) {
            try {
                await client.party.leave();
                partyTimerStart = false;
                showInfo("The bot left party due to party time expiring!", 'party');
                updateStatus();
            } catch (error) {
                showError('Error leaving the party:', error.stack || error);
            }
        } else {
            showInfo('No party to leave.', 'party');
        }
    };

    partyTimerStart = true;
    await sleep(2);
    if (client.party) {
        showInfo('Party timer has started!', 'party');
        partyLeaveTimer = setTimeout(leaveParty, seconds * 1000);
    } else {
        showError('The bot isn\'t in a party.', 'party');
    }
}

// RELOAD THE BOT AFTER AN AMOUNT OF TIME
async function startReloadTimer() {
    if (reload_time || reload_time !== "") {
        reload_time = 3600
    }
    let message;
    const reload_bot = async () => {
        let message = '[CLIENT] The bot is going to reload!';
        console.log(message[clientInfoColor]);
        showInfo(message, 'clientInfo');
        await client.logout();
        await loginAndInitClient();
    };
    await sleep(reload_time);
    message = '[CLIENT] The reload timer has ended!';
    console.log(message[clientInfoColor]);
    showInfo(message, 'clientInfo');
    await reload_bot();
}

async function CustomFortniteBot (client) {
    await InitFortniteClient()

    // IF THE BOT RECEIVE A FRIEND REQUEST => ACCEPT IT
    client.on('friend:request', async (pendingFriend) => {
        showInfo('Friend request sent to bot', 'clientInfo');
        try {
            await pendingFriend.accept();
            await client.friend.add(pendingFriend.displayName);
            showInfo(`Friend request from ${pendingFriend.displayName} accepted and has been added to the friend list`, 'clientInfo');

        } catch (error) {
            showError('Error accepting friend request:', error.stack || error);
        }
    });

    // IF THE BOT RECEIVE A REQUEST TO JOIN HIS GROUP => ACCEPT IT
    client.on('party:joinrequest', async (receivedRequest) => {
        showInfo('Join request received.', 'party');
        try {
            await receivedRequest.accept();
            showInfo('Join request accepted.', 'party');
            inUse = true;
            updateStatus();
            partyTimer(leave_time)
        } catch (error) {
            showError('Error accepting join request:', error.stack || error);
        }
    });

    // IF THE BOT RECEIVE A REQUEST TO JOIN A GROUP => ACCEPT IT
    client.on('party:invite', async (receivedInvite) => {
        showInfo('Party\'s invitation received.', 'party');
        try {
            if (client.party && client.party.size > 1) {
                showInfo('The invitation has been declined because the bot is already in a party', 'party')
            } else {
                await receivedInvite.accept();
                showInfo('Party invitation accepted.', 'party');
                inUse = true;
                updateStatus();
                partyTimer(leave_time)
            }
        } catch (error) {
            showError('Error accepting party invitation:', error.stack || error);
        }
    });

    // IF A MEMBER JOINED THE PARTY
    client.on('party:member:joined', async (member) => {
        if (member.displayName !== client.user.self.displayName) {
            showInfo(`Member ${member.displayName} joined the party.`, 'party');
            updateStatus();
            if (!partyTimerStart) {
                partyTimer(leave_time)
            }
        }
    });

    // IF A MEMBER LEFT THE PARTY
    client.on('party:member:left', async (member) => {
        if (member.displayName !== client.user.self.displayName) {
            showInfo(`Member ${member.displayName} left the party.`, 'party');
            if (client.party.size === 1) {
                if (partyLeaveTimer) {
                    clearTimeout(partyLeaveTimer);
                    showInfo('Party timer has been cancelled because a member left the party.', 'party');
                }
            }        
            updateStatus();
        } else {
            showInfo('The bot left the party', 'party');
            updateStatus();
        }        
    });

    // IF A MEMBER IS KICKED FROM THE PARTY
    client.on('party:member:kicked', async (member) => {
        if (member.displayName === client.user) {
            showInfo('The bot has been kicked', 'party');
            inUse = false;
            updateStatus();
        } else {
            showInfo(`Member ${member.displayName} has been kicked`, 'party');
            updateStatus();
        }
    });

    // IF A PLAYER SEND A MESSAGE
    client.on('party:member:message', handleCommand);
    client.on('friend:message', handleCommand);
}

module.exports = CustomFortniteBot;