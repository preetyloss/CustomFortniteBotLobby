const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('restart')
      .setDescription('Restart the Fortnite bot'),
    async execute(interaction, botClient) {
        botClient.restart();
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Restarting Fortnite bot')
        .setDescription('Restarting...')
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
  };
