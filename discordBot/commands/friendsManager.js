const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('friend')
    .setDescription('Manage your friend list')
    .addSubcommand(subcommand =>
      subcommand
        .setName('add')
        .setDescription('Add a friend')
        .addStringOption(option =>
          option.setName('username').setDescription('Username to add').setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('remove')
        .setDescription('Remove a friend')
        .addStringOption(option =>
          option.setName('username').setDescription('Username to remove').setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('list')
        .setDescription('View your friend list')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('clear')
        .setDescription('Clear your friend list')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('acceptrequest')
        .setDescription('Accept a friend request')
        .addStringOption(option =>
          option.setName('username').setDescription('Username to accept').setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('count')
        .setDescription('Count how many friends you have')
    ),

  async execute(interaction) {
    try {
      const subcommand = interaction.options.getSubcommand();
      const username = interaction.options.getString('username');

      const friendsList = Array.from(botClient.friend.list.values());
      const friends = friendsList.map(friend => friend._displayName);
      const friendRequests = await botClient.friend.pendingList();

      if (subcommand === 'add') {
        if (friends.includes(username)) {
          return interaction.reply({ content: `${username} is already your friend!`, ephemeral: true });
        }
        await botClient.friend.add(username);
        return interaction.reply({ content: `${username} has been added to your friend list!` });

      } else if (subcommand === 'remove') {
        if (!friends.includes(username)) {
          return interaction.reply({ content: `${username} is not in your friend list!`, ephemeral: true });
        }
        await botClient.friend.remove(username);
        return interaction.reply({ content: `${username} has been removed from your friend list!` });

      } else if (subcommand === 'list') {
        const embed = new EmbedBuilder()
          .setColor('#00FF00')
          .setTitle('Friend List')
          .setDescription(friends.length > 0 ? friends.join('\n') : 'Your friend list is empty.');
        return interaction.reply({ embeds: [embed] });

      } else if (subcommand === 'clear') {
        for (let i = 0; i < friends.length; i++) {
          await botClient.friend.remove(friends[i]);
        }
        return interaction.reply({ content: 'Your friend list has been cleared!' });

      } else if (subcommand === 'acceptrequest') {
        if (!friendRequests.includes(username)) {
          return interaction.reply({ content: `${username} has not sent you a friend request!`, ephemeral: true });
        }
        await botClient.friend.add(username);
        return interaction.reply({ content: `${username} has been added to your friend list!` });
      } else if (subcommand === 'count') {
        return interaction.reply({ content: `You have ${friends.length} friends!` });
      } else {
        return interaction.reply({ content: 'Invalid subcommand.', ephemeral: true });
      }

    } catch (error) {
      console.error(error);
      return interaction.reply({ content: 'An error occurred while processing your request.', ephemeral: true });
    }
  },
};
