const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bot')
    .setDescription('Modify the bot\'s appearance and level')
    .addSubcommand(subcommand =>
      subcommand.setName('skin')
        .setDescription('Change the bot\'s skin')
        .addStringOption(option =>
          option.setName('id').setDescription('ID of the skin').setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand.setName('backpack')
        .setDescription('Change the bot\'s backpack')
        .addStringOption(option =>
          option.setName('id').setDescription('ID of the backpack').setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand.setName('pickaxe')
        .setDescription('Change the bot\'s pickaxe')
        .addStringOption(option =>
          option.setName('id').setDescription('ID of the pickaxe').setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand.setName('emote')
        .setDescription('Make the bot perform an emote')
        .addStringOption(option =>
          option.setName('id').setDescription('ID of the emote').setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand.setName('level')
        .setDescription('Set the bot\'s level')
        .addIntegerOption(option =>
          option.setName('level').setDescription('Level of the bot').setRequired(true)
        )
    ),

  async execute(interaction) {
    try {
      const subcommand = interaction.options.getSubcommand();
      const id = interaction.options.getString('id');
      const level = interaction.options.getInteger('level');

      await interaction.deferReply({ flags: MessageFlags.Ephemeral });

      if (!botClient?.party?.me) {
        await interaction.followUp({ content: 'The bot is not initialized properly.', flags: MessageFlags.Ephemeral });
        return;
      }

      switch (subcommand) {
        case 'skin':
          await botClient.party.me.setOutfit(id);
          await interaction.followUp({ content: '✅ The bot\'s skin has been updated.', flags: MessageFlags.Ephemeral });
          break;
      
        case 'backpack':
          await botClient.party.me.setBackpack(id);
          await interaction.followUp({ content: '✅ The bot\'s backpack has been updated.', flags: MessageFlags.Ephemeral });
          break;
      
        case 'pickaxe':
          await botClient.party.me.setPickaxe(id);
          await interaction.followUp({ content: '✅ The bot\'s pickaxe has been updated.', flags: MessageFlags.Ephemeral });
          break;
      
        case 'emote':
          await botClient.party.me.setEmote(id);
          await interaction.followUp({ content: '✅ The bot\'s emote has been updated.', flags: MessageFlags.Ephemeral });
          break;
      
        case 'level':
          await botClient.party.me.setLevel(level);
          await interaction.followUp({ content: `✅ The bot's level has been set to **${level}**.`, flags: MessageFlags.Ephemeral });
          break;
      
        default:
          await interaction.followUp({ content: '⚠️ Invalid subcommand.', flags: MessageFlags.Ephemeral });
      }

    } catch (error) {
      console.error(`[ERROR] Command /bot ${interaction.options.getSubcommand()}:`, error);
      await interaction.followUp({ content: '❌ An error occurred while processing your request.', flags: MessageFlags.Ephemeral });
    }
  },
};
