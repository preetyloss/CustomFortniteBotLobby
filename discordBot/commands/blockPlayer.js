const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, MessageFlags } = require('discord.js');
const nconf = require('nconf');
const config = nconf.file({ file: 'config.json' });

module.exports = {
  data: new SlashCommandBuilder()
    .setName('blockPlayer')
    .setDescription('Manage the banned player\'s list')
    .addSubcommand(subcommand =>
      subcommand
        .setName('add')
        .setDescription('Add a user to the banned player\'s list')
        .addStringOption(option =>
          option.setName('username')
            .setDescription('Username to add')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('list')
        .setDescription('Show the current banned player\'s list')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('delete')
        .setDescription('Remove a user from the banned player\'s list')
        .addStringOption(option =>
          option.setName('username')
            .setDescription('Username to delete')
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    try {
      const subcommand = interaction.options.getSubcommand();
      const BannedPlayer = nconf.get('client:banned_player') || [];

      if (subcommand === 'add') {
        const usertoadd = interaction.options.getString('username');

        if (BannedPlayer.includes(usertoadd)) {
          return interaction.reply({
            content: `${usertoadd} is already in the banned player's list!`,
            ephemeral: MessageFlags.Ephemeral,
          });
        }

        BannedPlayer.push(usertoadd);
        nconf.set('client:banned_player', BannedPlayer);
        nconf.save();

        const embed = new EmbedBuilder()
          .setColor('#FF0000')
          .setTitle('Banned player Added')
          .setDescription(`${usertoadd} has been added to the banned player's list!`)
          .setTimestamp();

        await interaction.reply({ embeds: [embed] });
      } else if (subcommand === 'list') {
        const bannedPlayerList = BannedPlayer.length
          ? BannedPlayer.join('\n')
          : 'The banned player\'s list is currently empty.';

        const embed = new EmbedBuilder()
          .setColor('#00FF00')
          .setTitle('Banned player List')
          .setDescription(bannedPlayerList)
          .setTimestamp();

        await interaction.reply({ embeds: [embed] });
      } else if (subcommand === 'delete') {
        const usertodelete = interaction.options.getString('username');

        if (!BannedPlayer.includes(usertodelete)) {
          return interaction.reply({
            content: `${usertodelete} is not in the banned player's list!`,
            ephemeral: MessageFlags.Ephemeral,
          });
        }

        const updatedBannedPlayer = BannedPlayer.filter(admin => admin !== usertodelete);
        nconf.set('client:banned_player', updatedBannedPlayer);
        nconf.save();

        const embed = new EmbedBuilder()
          .setColor('#FF0000')
          .setTitle('Player Removed')
          .setDescription(`${usertodelete} has been removed from the banned player's list!`)
          .setTimestamp();

        await interaction.reply({ embeds: [embed] });
      } else {
        await interaction.reply({
          content: 'Unknown subcommand.',
          ephemeral: MessageFlags.Ephemeral,
        });
      }
    } catch (error) {
      console.error('Error executing command:', error);
      await interaction.reply({
        content: 'An error occurred while executing the command.',
        ephemeral: MessageFlags.Ephemeral,
      });
    }
  },
};