const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('party')
    .setDescription('Manage the Fortnite bot\'s party')
    .addSubcommand(subcommand =>
      subcommand.setName('kick')
        .setDescription('Kick a player from the party')
        .addStringOption(option =>
          option.setName('username').setDescription('Username to kick').setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand.setName('promote')
        .setDescription('Promote a player to party leader')
        .addStringOption(option =>
          option.setName('username').setDescription('Username to promote').setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand.setName('leave')
        .setDescription('Make the bot leave the party')
    ),

  async execute(interaction) {
    try {
      const subcommand = interaction.options.getSubcommand();
      const username = interaction.options.getString('username');

      if (!botClient?.party) {
        return interaction.reply({ content: '⚠️ The bot is not in a party.', ephemeral: true });
      }

      const botName = botClient.user.displayName;
      const party = botClient.party;

      if (subcommand === 'kick') {
        if (party.leader.displayName !== botName) {
          return interaction.reply({ content: '⚠️ The bot must be the party leader to kick players.', ephemeral: true });
        }

        await party.kick(username);
        return interaction.reply({ content: `✅ Player **${username}** has been kicked.`, ephemeral: true });

      } else if (subcommand === 'promote') {
        if (party.leader.displayName !== botName) {
          return interaction.reply({ content: '⚠️ The bot must be the party leader to promote players.', ephemeral: true });
        }

        await party.promote(username);
        return interaction.reply({ content: `✅ Player **${username}** has been promoted to party leader.`, ephemeral: true });

      } else if (subcommand === 'leave') {
        await party.leave();
        return interaction.reply({ content: '🚪 The bot has left the party.', ephemeral: true });
      }

    } catch (error) {
      console.error(`[ERROR] Command /party ${interaction.options.getSubcommand()}:`, error);
      return interaction.reply({ content: '❌ An error occurred while processing your request.', ephemeral: true });
    }
  },
};
