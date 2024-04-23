const { EmbedBuilder, codeBlock } = require('discord.js');

module.exports = {
  data: {
    name: 'help',
    description: 'Shows a list of available commands',
    options: [
      {
        name: 'command',
        description: 'The command you want more information about',
        type: 3, // String
        required: false,
      },
    ],
  },
  execute: async (interaction) => {
    const commandName = interaction.options.getString('command');
    const lucy = interaction.client;

    if (commandName) {
      const command = lucy.commands.get(commandName);
      if (!command) {
        return interaction.reply(`The command \`/${commandName}\` does not exist.`);
      }

      const embed = new EmbedBuilder()
        .setTitle(`Command: /${command.data.name}`)
        .setDescription(command.data.description)
        .addFields(
          { name: 'Category', value: command.category },
          { name: 'Cooldown', value: `${command.cooldown} seconds` },
          { name: 'NSFW', value: command.nsfw ? 'Yes' : 'No' }
        );

      if (command.examples) {
        embed.addFields({
          name: 'Examples',
          value: command.examples.map((example) => codeBlock(example)).join('\n'),
        });
      }

      if (command.usage) {
        embed.addFields({
          name: 'Usage',
          value: codeBlock(command.usage),
        });
      }

      return interaction.reply({ embeds: [embed] });
    }

    const embed = new EmbedBuilder()
      .setTitle('Available Commands')
      .setDescription('Here is a list of all the available commands:');

    lucy.commandCategories.forEach((category) => {
      const commandList = category.commands
        .map((cmd) => `\`/${cmd.data.name}\` - ${cmd.data.description}`)
        .join('\n');
      embed.addFields({ name: category.name, value: commandList });
    });

    embed.addFields({
      name: 'Command Cooldowns',
      value: 'All commands have a cooldown of 10 seconds.',
    });

    embed.setFooter({ text: 'Use /help <command> to get more information about a specific command.' });

    await interaction.reply({ embeds: [embed] });
  },
  category: 'General',
  categoryDescription: 'General-purpose commands',
  cooldown: 10,
  nsfw: false,
  examples: ['/help', '/help ping'],
  usage: '/help [command]',
};