module.exports = {
  name: 'guildCreate',
  execute(lucy, guild) {
    lucy.logger.info(`Joined a new guild: ${guild.name}`, guild.shard.id);
  },
};