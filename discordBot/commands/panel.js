const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('panel')
        .setDescription('Manage the Fortnite bot'),
    async execute(interaction, botClient) {
        const embed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('Fortnite Bot manage')
            .setDescription('Use the buttons below to manage the bot.')
            .setTimestamp();
        
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('logout_bot')
                    .setLabel('Logout')
                    .setStyle(ButtonStyle.Danger)
            );
        
        await interaction.reply({ embeds: [embed], components: [row] });
    }
};
