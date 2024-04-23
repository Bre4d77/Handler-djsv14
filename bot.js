const { Client, GatewayIntentBits, Collection, EmbedBuilder, REST, Routes } = require('discord.js');
const DiscordLogger = require('./handlers/logger');
const config = require('./settings/config');
const emoji = require('./settings/emoji');
const commandHandler = require('./handlers/commandHandler');
const eventHandler = require('./handlers/eventHandler');
//huihui

const lucy = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

lucy.logger = new DiscordLogger(lucy, { level: 'info' });
lucy.config = config;
lucy.emoji = emoji;
lucy.commands = new Collection();
lucy.commandCategories = new Collection();
lucy.cooldowns = new Collection();

const commands = commandHandler.loadCommands(lucy);
eventHandler.loadEvents(lucy);

lucy.login(config.botToken);