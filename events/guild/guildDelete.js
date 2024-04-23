module.exports = {
  name: 'guildDelete',
  execute(lucy, guild) {
    lucy.logger.info(`Left a guild: ${guild.name}`, guild.shard.id);
  },
};