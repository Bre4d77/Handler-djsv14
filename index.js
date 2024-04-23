const { ShardingManager } = require('discord.js');
const config = require('./settings/config');

const shardingManager = new ShardingManager(`${__dirname}/bot.js`, {
  totalShards: 'auto',
  mode: 'process',
  token: config.botToken,
});

shardingManager.on('shardCreate', (shard) => {
  console.log(`Launched shard ${shard.id}`);
  shard.on('ready', () => {
    console.log(`Shard ${shard.id} is ready!`);
  });
  shard.on('error', (error) => {
    console.log(`Shard ${shard.id} encountered an error:`, error);
  });
});

shardingManager.spawn({ timeout: -1 });