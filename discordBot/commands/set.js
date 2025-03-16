const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('set')
    .setDescription('Modify the bot\'s appearance and level')
    .addSubcommand(subcommand =>
      subcommand.setName('status')
        .setDescription('Change the bot\'s status')
        .addStringOption(option =>
          option.setName('status').setDescription('Status of the bot').setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand.setName('crowns')
        .setDescription('Change the bot\'s crowns')
        .addStringOption(option =>
          option.setName('crowns').setDescription('Crowns of the bot').setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand.setName('gamemode')
        .setDescription('Change the bot\'s gamemode')
        .addStringOption(option =>
          option.setName('gamemode').setDescription('The new gamemode').setRequired(true)
        )
    ),

  async execute(interaction) {
    try {
      const subcommand = interaction.options.getSubcommand();
      const status = interaction.options.getString('status');
      const crowns = interaction.options.getInteger('crowns');
      const gamemode = interaction.options.getInteger('gamemode');

      await interaction.deferReply({ flags: MessageFlags.Ephemeral });

      if (!botClient?.party?.me) {
        await interaction.followUp({ content: 'The bot is not initialized properly.', flags: MessageFlags.Ephemeral });
        return;
      }

      if (subcommand === "status") {
        await botClient.setStatus(status);
        await interaction.followUp({ content: '✅ The bot\'s status has been updated.', flags: MessageFlags.Ephemeral });
      } else if (subcommand === "crowns") {
        await botClient.party.me.setCosmeticStats(crowns, 1)
        await interaction.followUp({ content: '✅ The bot\'s crowns have been updated.', flags: MessageFlags.Ephemeral });
      } else if (subcommand === "gamemode") {
        await botClient.party.setPlaylist(gamemode)
        await interaction.followUp({ content: '✅ The bot\'s gamemode has been updated.', flags: MessageFlags.Ephemeral });
      } else {
        await interaction.followUp({ content: '❌ Invalid subcommand.', flags: MessageFlags.Ephemeral });
      }

    } catch (error) {
      console.error(`[ERROR] Command /bot ${interaction.options.getSubcommand()}:`, error);
      await interaction.followUp({ content: '❌ An error occurred while processing your request.', flags: MessageFlags.Ephemeral });
    }
  },
};
