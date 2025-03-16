const {
  discord_status_type, discord_status, run_discord_client
} = require('../structs/config');
const fs = require('fs');
const path = require('path');
const { Client: Dclient, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const handleDisconnected = require('../events/disconnected')
const { spawn } = require("child_process");

const executeScript = async (scriptName, scriptArgs = []) => {
  const script = spawn("node", [scriptName, ...scriptArgs]);

  script.stdout.on("data", (data) => {
    if (data) {
      const logMessage = data.toString();
      if (logMessage.includes('[DISCORD]')) {
        console.log(logMessage); 
      } else {
        console.log(logMessage); 
      }
    }
  });

  script.stderr.on("data", (data) => {
    console.log(`Error --> ${data}`);
    process.exit(1);
  });

  script.on("close", (code) => {
    if (code === 0) {
      console.log(`Lobbybot finished with code ${code}`);
      process.exit(1);
    }
  });
};
async function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

function initializeDiscordBot(botClient) {
  if (!process.env.DISCORD_TOKEN) {
    showError("DISCORD_TOKEN is not defined in environment variables.", 'sysError');
    return;
  }

  const dclient = new Dclient({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] 
  });

  dclient.commands = new Map();

  dclient.once('ready', async () => {
    let typeStatus
    switch (discord_status_type) {
      case 'LISTENING':
        typeStatus = 2;
        break;
      case 'WATCHING':
        typeStatus = 3;
        break;
      default:
        typeStatus = 0;
        break;
    }
    setTimeout(() => {
        dclient.user.setPresence({
            activities: [{ name: discord_status, type: typeStatus }], 
            status: 'online'
        });
    }, 2000);

    showInfo(`Status set to: ${discord_status_type} ${discord_status}`, 'discord');

    const commands = [];
    const commandsPath = path.join(__dirname, './commands');

    fs.readdirSync(commandsPath).forEach(file => {
      try {
        const command = require(path.join(commandsPath, file));
        if (command.data && command.execute) {
          dclient.commands.set(command.data.name, command);
          commands.push(command.data.toJSON());
        } else {
          showError(`Invalid command file skipped: ${file}`);
        }
      } catch (error) {
        showError(`Error loading command file: ${file}`);
        console.error(error);
      }
    });

    if (commands.length > 0) {
      dclient.application.commands.set(commands)
        .then(() => showInfo(`${commands.length} commands successfully registered!`, 'discord'))
        .catch((error) => {
          showError("Error refreshing commands:");
          console.error(error);
        });
    } else {
      showError("No valid commands found!");
    }
  });

  dclient.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
      if (interaction.customId === 'logout_bot') {
        await interaction.deferUpdate();
        await handleDisconnected(botClient)
        await botClient.logout();

        const statusEmbed = new EmbedBuilder()
          .setColor('#00FF00')
          .setTitle('Bot Logout')
          .setDescription('The bot is now logged out...')
          .setTimestamp();

          return interaction.editReply({ embeds: [statusEmbed] })
      } else if (interaction.customId === 'start_bot') {
          await interaction.deferUpdate();
          executeScript("structs/lobbybot.js");
  
          const statusEmbed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle('Bot Start')
            .setDescription('The bot is now starting...')
            .setTimestamp();
  
            return interaction.editReply({ embeds: [statusEmbed] })
        }
    } 

    if (interaction.isCommand()) {
      const command = dclient.commands.get(interaction.commandName);

      if (!command) {
        const embed = new EmbedBuilder()
          .setColor('#FF0000')
          .setTitle('Error')
          .setDescription('Unknown command.');
        return interaction.reply({ embeds: [embed] });
      }

      try {
        await command.execute(interaction, botClient);
      } catch (error) {
        showError(`Error executing command: ${interaction.commandName}`);
        console.error(error);
        const embed = new EmbedBuilder()
          .setColor('#FF0000')
          .setTitle('Error')
          .setDescription('There was an error executing the command.');
        return interaction.reply({ embeds: [embed] });
      }
    }
  });

  if (run_discord_client) {
    dclient.login(process.env.DISCORD_TOKEN)
      .then(() => showInfo("Client successfully logged in!", 'discord'))
      .catch((error) => {
        showError("[DISCORD] Error logging in:", 'sysError');
        console.error(error);
      });
  } else {
    showInfo("Client disabled.", 'discord');
  }
}

module.exports = initializeDiscordBot;