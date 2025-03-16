const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const nconf = require('nconf');

nconf.file({ file: './config.json' });
const version = nconf.get('DarkDus:version')
let message = `DarkDus - A Custom Fortnite Bot ${version} \n
Commands: \n
- /bot skin <id> \n
- /bot backpack <id> \n
- /bot pickaxe <id> \n
- /bot emote <id> \n
- /bot level <level> \n
- /set status <status> \n
- /set crowns <number> \n
- /set gamemode <gamemode> \n
- /party kick <username> \n
- /party invite <username> \n
- /party promote <username> \n
- /party leave \n
- /party hide <username> \n
- /party hide-all \n
- /party unhide <username> \n
- /party unhide-all \n
- /friend add <username> \n
- /friend remove <username> \n
- /friend list \n
- /friend acceptrequest <username> \n
- /friend count \n`;

module.exports = {
    data: new SlashCommandBuilder()
      .setName('help')
      .setDescription('Help command'),
    async execute(interaction) {
      const embed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('Help command')
        .setDescription(message)
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
  };
