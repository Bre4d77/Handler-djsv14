module.exports = {
  name: 'interactionCreate',
  async execute(lucy, interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = lucy.commands.get(interaction.commandName);

    if (!command) return;

    const now = Date.now();
    if (lucy.cooldowns.has(command.data.name)) {
      const expirationTime = lucy.cooldowns.get(command.data.name) + command.cooldown * 1000;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return interaction.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`/${command.data.name}\` command.`);
      }
    }

    try {
      await command.execute(interaction,lucy);
      lucy.cooldowns.set(command.data.name, now);
      setTimeout(() => lucy.cooldowns.delete(command.data.name), command.cooldown * 1000);
    } catch (error) {
      lucy.logger.error(error, lucy.shard.id);
      await interaction.reply({ content: `There was an error while executing this command!`, ephemeral: true });
    }
  },
};