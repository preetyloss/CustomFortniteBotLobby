const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, MessageFlags } = require('discord.js');
const nconf = require('nconf');
const config = nconf.file({ file: 'config.json' });

module.exports = {
  data: new SlashCommandBuilder()
    .setName('admin')
    .setDescription('Manage the admin\'s list')
    .addSubcommand(subcommand =>
      subcommand
        .setName('add')
        .setDescription('Add a user to the admin\'s list')
        .addStringOption(option =>
          option.setName('username')
            .setDescription('Username to add')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('list')
        .setDescription('Show the current admin\'s list')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('delete')
        .setDescription('Remove a user from the admin\'s list')
        .addStringOption(option =>
          option.setName('username')
            .setDescription('Username to delete')
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const admins = nconf.get('client:command_admin:admins');

    if (subcommand === 'add') {
      const usertoadd = interaction.options.getString('username');

      if (admins.includes(usertoadd)) {
        return interaction.reply({
          content: `${usertoadd} is already in the admin's list!`,
          ephemeral: MessageFlags.Ephemeral
        });
      }

      admins.push(usertoadd);
      nconf.set('admins', admins);
      nconf.save();

      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Admin Added')
        .setDescription(`${usertoadd} has been added to the admin's list!`)
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } else if (subcommand === 'list') {
      const adminList = admins.length
        ? admins.join('\n')
        : 'The admin\'s list is currently empty.';

      const embed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('Admin List')
        .setDescription(adminList)
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } else if (subcommand === 'delete') {
      const usertodelete = interaction.options.getString('username');

      if (!admins.includes(usertodelete)) {
        return interaction.reply({
          content: `${usertodelete} is not in the admin's list!`,
          ephemeral: MessageFlags.Ephemeral,
        });
      }

      const updatedAdmins = admins.filter(admin => admin !== usertodelete);
      nconf.set('admins', updatedAdmins);
      nconf.save();

      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Admin Removed')
        .setDescription(`${usertodelete} has been removed from the admin's list!`)
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    }
  },
};
