const { Client, GatewayIntentBits, Collection, EmbedBuilder, REST, Routes } = require('discord.js');
const DiscordLogger = require('./handlers/logger');
const config = require('./settings/config');
const emoji = require('./settings/emoji');
const commandHandler = require('./handlers/commandHandler');
const eventHandler = require('./handlers/eventHandler');
const { Connectors } = require("shoukaku");
const { Kazagumo, Plugins } = require("kazagumo");

const lucy = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

lucy.logger = new DiscordLogger(lucy, { level: 'info' });
lucy.config = config;
lucy.emoji = emoji;
lucy.commands = new Collection();
lucy.commandCategories = new Collection();
lucy.cooldowns = new Collection();

const nodes = [
    {
        name: "oryxe ",
        url: 'lavalink.oryzen.xyz',
        auth: 'oryzen.xyz',
        port: 80,
        secure: false,
    },
];
 lucy.kazagumo = new Kazagumo({
    defaultSearchEngine: 'youtube', // 'youtube' | 'soundcloud' | 'youtube_music'
    plugins: [new Plugins.PlayerMoved(lucy)],
    send: (guildId, payload) => {
        const guild = lucy.guilds.cache.get(guildId);
        if (guild) guild.shard.send(payload);
    }
}, new Connectors.DiscordJS(lucy), nodes);

lucy.on("ready", async () => {
    lucy.logger.info('Client is ready!');
 
});

lucy.kazagumo.shoukaku.on('ready', (name) => lucy.logger.info(`Lavalink ${name}: Ready!`));
lucy.kazagumo.shoukaku.on('error', (name, error) => console.error(`Lavalink ${name}: Error Caught,`, error));
lucy.kazagumo.shoukaku.on('close', (name, code, reason) => console.warn(`Lavalink ${name}: Closed, Code ${code}, Reason ${reason || 'No reason'}`));
lucy.kazagumo.shoukaku.on('debug', (name, info) => lucy.logger.debug(`Lavalink ${name}: Debug,: ${info}`));
lucy.kazagumo.shoukaku.on('disconnect', (name, players, moved) => {
    if (moved) return;
    players.map(player => player.connection.disconnect())
    console.warn(`Lavalink ${name}: Disconnected`);
});

const commands = commandHandler.loadCommands(lucy);
eventHandler.loadEvents(lucy);

lucy.login(config.botToken);