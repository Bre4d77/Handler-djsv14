hi
# 🤖 Lucy Discord.js v14 Command Handler 🤖

> Unleash the power of Discord.js v14 with this sleek, efficient, and downright adorable command handler! Prepare to be dazzled by its sheer awesomeness.

## 🌟 Features 🌟

<details>
<summary>🌟 Click to see all the amazing features 🌟</summary>

- 📂 Easily manage your commands with a dedicated `commands` directory, because who doesn't love a good ol' file structure?
- 🔍 Automatically load and register all your commands globally, because ain't nobody got time for manual registration.
- 🤖 Seamless integration with Discord.js v14 and its latest features, because we're all about that cutting-edge tech.
- 🚀 Streamlined event handling for slash command interactions, because who needs complexity when you can have simplicity?
- 🔍 Robust error handling to ensure your bot stays up and running, because we all know Murphy's Law loves to rear its ugly head.
- 🕰️ Implement command cooldowns to prevent abuse, because we don't want your users to spam the poor bot to death.
- 📚 Organize your commands into categories for better navigation, because let's face it, no one likes a cluttered mess.
- 💁‍♀️ Provide a helpful and visually appealing help command, because we believe in making your users' lives easier (and more entertained).
- 🌟 Beautiful and informative logging for easy debugging, because who doesn't love a good ol' console log party?
- 📥 Implemented a command that allows users to download anime episodes directly from the bot, because we all know that's the real reason you're here.

</details>

## 🛠️ Required Libraries 🛠️

This command handler requires the following libraries, because we believe in keeping things up-to-date and secure:

<details>
<summary>🛠️ Click to see the required libraries 🛠️</summary>

- `axios`: ^1.6.8, because who doesn't love making HTTP requests?
- `boxen`: ^5.1.2, because we all need a little bit of ASCII art in our lives.
- `chalk`: ^4.1.2, because color is the spice of life.
- `discord.js`: ^14.14.1, because we're all about that Discord API goodness.
- `dotenv`: ^16.4.5, because we don't want your bot's secrets spilling out for the world to see.
- `figlet`: ^1.5.2, because ASCII art is the true mark of a sophisticated bot.
- `logform`: ^2.6.0, because we believe in keeping our logs organized and fabulous.
- `moment-timezone`: ^0.5.45, because time is a fickle thing and we need to keep track of it.
- `ora`: ^5.4.1, because who doesn't love a good ol' loading spinner?

</details>

Make sure to install these dependencies before using the command handler, or else your bot might just decide to take a nap.

## 🔑 Environment Setup 🔑

1. Create a `.env` file in the root directory of your project, because we all love a good ol' environment variable party.
2. Add the following environment variables to the `.env` file:
   - `BOT_TOKEN`: Your Discord bot token, because we don't want your bot to be a lonely little thing.
   - `CLIENT_ID`: Your Discord bot client ID, because we need to know who's the boss around here.

The `config.js` file in the `settings` directory should already be set up with the following content, because we believe in making your life easier just edit if you want:
3. Run the npm command to install dependencies 
```javascript
npm install
```

This will allow you to easily access your bot's token, client ID, and custom emojis throughout your project, because we believe in keeping things DRY (Don't Repeat Yourself).

## 🤖 Usage 🤖

To use this command handler, follow these steps:

1. 🚀 Add your command files to the `commands` directory, following the structure outlined in the example, because we believe in keeping things consistent.
2. 🔍 Update the `env`  with your bot's token, because we don't want your bot to be a wallflower.
3. 🤖 Start your bot and watch as it handles your commands with the grace and elegance of a ballerina, because we believe in making your life easier (and more entertaining).

## 🤖 Basic Command Structure 🤖

Here's a basic structure for a Discord.js v14 command, because we believe in keeping things simple (and a little bit sassy):

```javascript
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('command-name')
    .setDescription('A brief description of the command, because we believe in keeping things concise'),
  execute: async (interaction) => {
    try {
      // Command logic goes here, because that's what we're all about
      await interaction.reply('Command executed successfully, because we're just that good!');
    } catch (error) {
      console.error('Error executing command, because sometimes things just don't go our way:', error);
      await interaction.reply('An error occurred while executing the command, because we're not perfect (yet).');
    }
  },
  category: 'General', // Optional: Categorize your commands, because organization is key
  categoryDescription: 'General purpose commands, because we believe in keeping things simple', // Optional: Describe the command category
  cooldown: 5, // Optional: Set a cooldown for the command in seconds, because we don't want your users to spam the poor bot
  nsfw: false, // Optional: Set the command as NSFW, because we believe in keeping things family-friendly
  examples: ['/command-name arg1 arg2'], // Optional: Provide example usage, because we believe in helping our users
  usage: '/command-name <arg1> <arg2>', // Optional: Describe the command usage, because we believe in keeping things clear
};
```

## 🤝 Contributing 🤝

We welcome contributions from the community, because we believe in the power of collaboration! If you've found a bug, have a feature request, or simply want to help improve this command handler, feel free to open an issue or submit a pull request, because we love a good ol' code party.

<details>
<summary>🤝 Click to see how to contribute 🤝</summary>

To get started, simply fork the repository, make your changes, and submit a pull request, because we believe in keeping things simple (and a little bit sassy). We'll review your contributions and, if they're up to par, merge them into the main codebase, because we believe in keeping things fresh and exciting.

Together, we can make this command handler even better and help the Discord.js community thrive, because we believe in the power of teamwork (and a little bit of friendly competition).

</details>
