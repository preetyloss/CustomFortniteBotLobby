const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const nconf = require('nconf');

nconf.file({ file: './config.json' });
const version = nconf.get('DarkDus:version')
let message = `Dark Dus - A Custom Fortnite Bot ${version} \n Commands: \n - bot@inviteFriend \n - bot@kick \n - bot@changeGamemode \n - bot@addFriend \n - bot@logout \n - bot@changeStatus \n - bot@backpack \n - bot@pickaxe \n - bot@outfit \n - bot@promote \n - bot@level \n - bot@ready \n - bot@battlepass \n - bot@emote \n - bot@stopEmote \n - bot@help`

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
