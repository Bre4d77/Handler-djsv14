const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const { handleError, handleSearch ,sendLinks} = require('../handlers/anime.js')
module.exports = {
  data: {
    name: 'animedown',
    description: 'Download anime episodes',
    options: [
      {
        name: 'query',
        description: 'The anime you want to search for',
        type: 3, // String
        required: true,
      },
      {
        name: 'episode',
        description: 'The episode number you want to download',
        type: 4, // Integer
        required: true,
      },
    ],
  },
  execute: async (interaction, lucy) => {
    const query = interaction.options.getString('query');
    const episodeNumber = interaction.options.getInteger('episode');
    const searchUrl = `${lucy.config.searchBaseUrl}/${query}`;

    try {
      
      const selectedAnime = await handleSearch(interaction, searchUrl, lucy);
      await interaction.channel.sendTyping();
      await sendLinks(selectedAnime.id, interaction, episodeNumber, lucy);
    } catch (error) {
      console.error('Error searching 😭😭💀', error);
      await handleError(interaction, error, lucy);
    }
  },
  category: 'Anime',
  categoryDescription: 'Commands related to anime',
  cooldown: 10,
  nsfw: false,
  examples: ['/animedown naruto 10', '/animedown one-piece 25'],
  usage: '/animedown <query> <episode>',
};
