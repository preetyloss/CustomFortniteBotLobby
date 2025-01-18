///////////////////////////////////////////////////////////
///////                                             ///////
///////     Dark Dus - Discord Bot                  ///////
///////     Version 1.3.5                           ///////     
///////                                             ///////
///////////////////////////////////////////////////////////

const { Client: DiscordClient, GatewayIntentBits, REST, Routes } = require('discord.js');
const discordClient = new DiscordClient({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const { Client: FortniteClient } = require('fnbr');
const { CustomFortniteBot } = require('./fn/main.js')
const show = require('../utils/sys/show.js');
const nconf = require('nconf');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

nconf.env();

const discordToken = nconf.get('DISCORD_TOKEN');

const commands = [
    {
        name: 'help',
        description: 'HELP with Dark Dus Custom Fortnite Bot',
    },
    {
        name: 'login',
        description: 'Init a Dark Dus Custom Fortnite Bot (Authorizian code required)',
        options: [
            { name: 'code', description: 'The authorizian code of the bot', type: 3, require: true }
        ]
    },
    {
        name: 'logout',
        description: 'Log out the Dark Dus Custom Fortnite Bot'
    },
    {
        name: 'start',
        description: 'Start the Dark Dus Custom Fortnite Bot'
    }
];

const rest = new REST({ version: '10' }).setToken(discordToken);

discordClient.once('ready', async () => {
    show(`Logged in as ${discordClient.user.tag}`);

    try {
        show('Initializing slash commands...');
        await rest.put(Routes.applicationCommands(discordClient.user.id), { body: commands });
        show('Slash commands are ready!');
    } catch (err) {
        show('Failed to initialize slash commands: ' + err.message);
    }

    // Envoyer un message dans un canal spécifique
    const channelId = nconf.get('DISCORD_CHANNEL_ID');
    const channel = discordClient.channels.cache.get(channelId);
    if (channel) {
        channel.send('Le bot est maintenant en ligne!');
    } else {
        show('Le canal spécifié est introuvable.');
    }
});

const clientLoginStatus = {};

discordClient.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;
    const discordUsername = interaction.user.username;

    const userAccountId = nconf.get(discordUsername + '_accountId');
    const userDeviceId = nconf.get(discordUsername + '_deviceId');
    const userSecret = nconf.get(discordUsername + '_secret');

    const auth = {
        deviceAuth: {
            accountId: userAccountId,
            deviceId: userDeviceId,
            secret: userSecret
        }
    };

    const fortniteClient = new FortniteClient(auth);

    if (commandName === 'help') {
        const message = `
Fortnite Commands:
### Outfit
- \`bot@outfit <newSkin>\` : Change the bot's skin.
- \`bot@pickaxe <newPickaxe>\` : Change the bot's pickaxe.
- \`bot@backpack <newBackpack>\` : Change the bot's backpack.

### Party/Friends
- \`bot@changeGamemode <gamemode>\` : Change the current game mode.
- \`bot@kick <username>\` : Kick a player from the party.
- \`bot@promote <username>\` : Promote a player to party leader.
- \`bot@ready\` : Set the bot's status to ready.
- \`bot@inviteFriend <username>\` : Invite a friend to the party.
- \`bot@addFriend <username>\` : Add a friend.

### Client
- \`bot@emote <emote>\` : Make the bot perform an emote.
- \`bot@stopEmote\` : Stop the current emote.
- \`bot@level <level>\` : Set the bot's level.
- \`bot@battlepass <purchased> <level>\` : Set the bot's battle pass status and level.

### Others
- \`bot@changeStatus <newStatus>\` : Change the bot's status.
- \`bot@logout\` : Log out the bot.
- \`bot@version\` : Display the bot's version.
- \`bot@help\` : Display help information (not available).

Bot commands:
- \`/start\` : Start the bot.
- \`/logout\` : Log out the bot.
- \`/login\` : Log in the bot.
- \`/help\` : Display help information.`;
        await interaction.reply(message);
    } else if (commandName === 'login') {
        if (nconf.get(discordUsername + "_accountId")) {
            await interaction.reply('Bot is already logged in');
            return;
        }
        const code = interaction.options.getString('code');
        await interaction.reply('Try to create a FortniteClient with the authorization code ' + code);

        try {
            await fortniteClient.login({ authorizationCode: code });
            const deviceAuth = await fortniteClient.createDeviceAuth();
            await fortniteClient.logout();

            const filePath = `/temporary/${discordUsername}_deviceAuth.json`;
            fs.writeFileSync(filePath, JSON.stringify(deviceAuth, null, 2));

            const envContent = fs.readFileSync('.env', 'utf8');
            const newEnvContent = `${envContent}\n${discordUsername}_accountId=${deviceAuth.accountId}\n${discordUsername}_deviceId=${deviceAuth.deviceId}\n${discordUsername}_secret=${deviceAuth.secret}`;
            fs.writeFileSync('.env', newEnvContent);

            fs.unlinkSync(filePath);

            await interaction.reply(`You are successfully login`);
        } catch (err) {
            show('Failed to create DeviceAuth: ' + err.message);
            await interaction.reply('Failed to create DeviceAuth.');
        }
    } else if (commandName === 'logout') {
        if (!clientLoginStatus[discordUsername]) {
            await interaction.reply('Bot is not logged in');
            return;
        }
        try {
            await interaction.reply('Logging out of Fortnite...');
            await fortniteClient.logout();
            clientLoginStatus[discordUsername] = false;
            show('Successfully logged out of Fortnite');
        } catch (err) {
            show('Failed to log out of Fortnite: ' + err.message);
        }
    } else if (commandName === 'start') {
        if (clientLoginStatus[discordUsername]) {
            await interaction.reply('Bot is already logged in');
            return;
        }
        clientLoginStatus[discordUsername] = true;
        try {
            await interaction.reply('Logging into Fortnite...');
            await fortniteClient.login();

            const channel = interaction.channel;
            if (channel) {
                channel.send('Logged into Fortnite as ' + (fortniteClient.user.self ? fortniteClient.user.self.displayName : 'unknown user'));
            }

            CustomFortniteBot(fortniteClient);
        } catch (err) {
            show('Failed to log into Fortnite: ' + err.message);
        }
    }
});

discordClient.login(discordToken);
