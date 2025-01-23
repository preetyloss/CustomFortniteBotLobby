const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('logout')
      .setDescription('Logout the Fortnite bot'),
    async execute(interaction, botClient) {
        botClient.logout();
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Logging out Fortnite bot')
        .setDescription('Logging out...')
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
  };
