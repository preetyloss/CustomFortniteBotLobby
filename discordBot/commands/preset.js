const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const presetsFilePath = path.join(__dirname, '../outfit/presets.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('preset')
    .setDescription('Manage your friend list')
    .addSubcommand(subcommand =>
      subcommand
        .setName('show')
        .setDescription('Show all presets')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('equip')
        .setDescription('Equip a preset')
        .addStringOption(option =>
          option.setName('id').setDescription('Id of the preset to equip').setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('create')
        .setDescription('Create a preset')
        .addStringOption(option =>
          option.setName('outfit').setDescription('Id of the outfit').setRequired(true)
        )
        .addStringOption(option =>
          option.setName('pickaxe').setDescription('Id of the pickaxe').setRequired(true)
        )
        .addStringOption(option =>
          option.setName('backpack').setDescription('Id of the backpack').setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('clear')
        .setDescription('Clear your presets')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('remove')
        .setDescription('Remove a preset')
        .addStringOption(option =>
          option.setName('id').setDescription('Id of the preset to remove').setRequired(true)
        )
    ),

  async execute(interaction) {
    try {
      const subcommand = interaction.options.getSubcommand();
      const id = interaction.options.getString('id');
      const outfit = interaction.options.getString('outfit');
      const pickaxe = interaction.options.getString('pickaxe');
      const backpack = interaction.options.getString('backpack');

      let presets = {};

      if (fs.existsSync(presetsFilePath)) {
        const fileContent = fs.readFileSync(presetsFilePath, 'utf8');
        presets = JSON.parse(fileContent);
      }

      if (subcommand === 'show') {
        const presetList = Object.keys(presets).map(key => 
          `**ID:** ${key} - Skin: ${presets[key].skin}, Backpack: ${presets[key].backpack}, Pickaxe: ${presets[key].pickaxe}`
        ).join('\n') || 'No presets found.';

        return interaction.reply({ content: presetList, ephemeral: true });

      } else if (subcommand === 'equip') {
        if (!presets[id]) return interaction.reply({ content: 'Preset not found.', ephemeral: true });
        await botClient.party.me.setBackpack(presets[id].backpack);
        await botClient.party.me.setOutfit(presets[id].skin);
        await botClient.party.me.setPickaxe(presets[id].pickaxe);

        return interaction.reply({ content: `Equipped preset ${id}: ${presets[id].skin}`, ephemeral: true });

      } else if (subcommand === 'create') {
        const newId = Object.keys(presets).length.toString();
        presets[newId] = { skin: outfit, backpack, pickaxe };

        fs.writeFileSync(presetsFilePath, JSON.stringify(presets, null, 2));

        return interaction.reply({ content: `Preset created with ID: ${newId}`, ephemeral: true });

      } else if (subcommand === 'clear') {
        fs.writeFileSync(presetsFilePath, JSON.stringify({}, null, 2));

        return interaction.reply({ content: 'All presets have been cleared.', ephemeral: true });

      } else if (subcommand === 'remove') {
        if (!presets[id]) return interaction.reply({ content: 'Preset not found.', ephemeral: true });

        delete presets[id];
        fs.writeFileSync(presetsFilePath, JSON.stringify(presets, null, 2));

        return interaction.reply({ content: `Preset ${id} has been removed.`, ephemeral: true });

      } else {
        return interaction.reply({ content: 'Invalid subcommand.', ephemeral: true });
      }

    } catch (error) {
      console.error(error);
      return interaction.reply({ content: 'An error occurred while processing your request.', ephemeral: true });
    }
  },
};
