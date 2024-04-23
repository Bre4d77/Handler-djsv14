const fs = require('fs');
const path = require('path')
const {Collection} = require('discord.js')
class CommandCategory {
  constructor(name, description, nsfw = false) {
    this.name = name;
    this.description = description;
    this.nsfw = nsfw;
    this.commands = new Collection();
  }

  addCommand(command) {
    this.commands.set(command.data.name, command);
  }
}

module.exports = {
  loadCommands(lucy) {
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    const commands = [];
    const commandCategories = new Collection();

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      let category = commandCategories.get(command.category);
      if (!category) {
        category = new CommandCategory(command.category, command.categoryDescription, command.nsfw || false);
        commandCategories.set(command.category, category);
      }
      category.addCommand(command);
      lucy.commands.set(command.data.name, command);
      commands.push(command.data);
    }

    lucy.commandCategories = commandCategories;
    return commands;
  },
};