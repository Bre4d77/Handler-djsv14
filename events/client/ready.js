const { REST, Routes } = require('discord.js');
const commandHandler = require('../../handlers/commandHandler');
const chalk = require('chalk');
const ora = require('ora');
const boxen = require('boxen');

module.exports = {
  name: 'ready',
  async execute(lucy) {
    const boxOptions = {
      padding: 1,
      margin: 1,
      borderStyle: 'double',
      borderColor: '#FFAA1D',
      backgroundColor: '#E3FF1D',
    };

    const asciiArt = boxen(`✅ Lucy ✅\nUwu~ a advanced bot! \nCredits: \nHandler by @bre4d77 ( https://discord.com/invite/e6Jqr8e7 ) \n Invite Lucy: https://tinyurl.com/InviteLucy \n Vote for Lucy: https://tinyurl.com/topggLucy `, boxOptions);

    console.log(chalk.hex('#FF69B4')(`\x1b[1m${asciiArt}\x1b[0m`));

    lucy.logger.info(`${lucy.user.tag} is online and ready! OwO`, lucy.shard.id);
  
    try {
      
      const spinner = ora('🤖 Syncing application (/) commands...').start();
      lucy.logger.info(' Starting to sync application (/) commands.', lucy.shard.id);

      // Fetch existing commands
      const rest = new REST({ version: '9' }).setToken(lucy.config.botToken);
      const existingCommands = await rest.get(Routes.applicationCommands(lucy.config.clientId));

      // Delete existing commands
      await Promise.all(existingCommands.map(async (command) => {
        await rest.delete(Routes.applicationCommand(lucy.config.clientId, command.id));
        lucy.logger.debug(`Deleted command: ${command.name}`, lucy.shard.id);
      }));

      // Register new commands
      const commands = commandHandler.loadCommands(lucy);
      await rest.put(Routes.applicationCommands(lucy.config.clientId), { body: commands });

      spinner.succeed('🤖 Yay! Successfully synced application (/) commands.');
      lucy.logger.debug('Successfully synced application (/) commands.', lucy.shard.id);

      // Set custom status
      let statusIndex = 0;
      setInterval(() => {
        lucy.user.setActivity(lucy.config.statusMessages[statusIndex], { type: 'PLAYING' });
        statusIndex = (statusIndex + 1) % lucy.config.statusMessages.length;
      }, lucy.config.statusChangeInterval);
    } catch (error) {
      lucy.logger.error(`Uh oh, an error occurred: ${error}`, lucy.shard.id);
    }
  },
};