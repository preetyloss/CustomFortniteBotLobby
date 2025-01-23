const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const nconf = require('nconf')
nconf.file({ file: './config.json' });

const accountId = nconf.get('ACCOUNT1_ID')
const deviceId = nconf.get('ACCOUNT1_DEVICE_ID')
const secret = nconf.get('ACCOUNT1_SECRET')

module.exports = {
    data: new SlashCommandBuilder()
      .setName('show_bots')
      .setDescription('Show the bot\'s info'),
    async execute(interaction) {
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Bot\'s info')
        .setDescription(`Bot's accountId: ${accountId} \n Bot's deviceId: ${deviceId} \n Bot's secret: ${secret}`)
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
  };
  