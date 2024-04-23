const axios = require('axios');
const { ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const chalk = require('chalk');

async function handleSearch(interaction, searchUrl, lucy) {
  try {
    const response = await axios.get(searchUrl);
    const data = response.data;

    if (data.results.length === 0) {
      await interaction.reply({ content: 'Aww, it seems my search for that title came up empty-handed. How unfortunate! (╥﹏╥)', ephemeral: true });
      return null;
    }

    const animeButtons = data.results.slice(0, 5).map((anime, index) => new ButtonBuilder()
      .setCustomId(`select_anime_${index}`)
      .setLabel(`${index + 1}. ${anime.title}`)
      .setStyle('Primary')
    );

    const row = new ActionRowBuilder().addComponents(animeButtons);

    await interaction.reply({ content: 'Yippee! Please, my dear senpai, select the anime you wish to explore. ٩(◕‿◕)۶', components: [row], fetchReply: true });

    const filter = i => i.user.id === interaction.user.id && i.isButton();
    const responseSelect = await interaction.channel.awaitMessageComponent({ filter, time: 60000, errors: ['time'] });

    if (!responseSelect) {
      await interaction.editReply({ content: 'Alas, the interaction has timed out. How unfortunate! ಥ_ಥ' });
      return null;
    }

    const selectedIndex = parseInt(responseSelect.customId.split('_')[2]);

    if (selectedIndex < 0 || selectedIndex >= data.results.length) {
      await interaction.editReply({ content: 'Oh dear, that does not appear to be a valid selection. My apologies, senpai! (◕‿◕✿)' });
      return null;
    }

    const selectedAnime = data.results[selectedIndex];
    await responseSelect.update({ content: `Hooray! You have chosen ${selectedAnime.title}. Now, let us fetch the download links, shall we? ٩(◕‿◕)۶`, components: [] });
    return selectedAnime;
  } catch (error) {
    console.error('Goodness gracious, an error occurred during the search: ', error);
    await handleError(interaction, error, lucy);
    throw error;
  }
}

async function handleError(interaction, error, lucy) {
  if (error.response && error.response.data) {
    await interaction.channel.send({ content: `Oh dear, it seems an error has occurred during the search for the anime. Perhaps double-checking the episode number and title would be wise? (╥﹏╥)`, ephemeral: true });
    await logError(interaction, error, lucy);
  } else {
    console.log("Goodness me, another error at line 81 in ani.mjs. (◕‿◕✿)");
    await logError(interaction, error, lucy);
  }
}

async function logError(interaction, error, lucy) {
  try {
    // Use your existing logging system here
    lucy.logger.error(`
      Hooray! The command used was /animedown
      User: ${interaction.user.username}#${interaction.user.discriminator}
      Error: ${error.message}
    `);
  } catch (err) {
    console.error('Goodness gracious, an error occurred while logging the error: ', err);
  }
}

async function shortenURL(longURL) {
  try {
    const response = await axios.get(`http://tinyurl.com/api-create.php?url=${encodeURIComponent(longURL)}`);
    return response.data;
  } catch (error) {
    console.error('Goodness me, an error occurred while shortening the URL: ', error);
    return longURL;
  }
}

async function checkEpisodeAvailability(animeId, episodeNumber, interaction, lucy) {
  try {
    const response = await axios.get(`${lucy.config.searchBaseUrl}/info/${animeId}`);
    const totalEpisodes = response.data.totalEpisodes;

    if (episodeNumber > totalEpisodes) {
      console.log(`Alas, episode ${episodeNumber} is not available. The anime has only ${totalEpisodes} episodes. (╥﹏╥)`)
      await interaction.reply({
        content: `Alas, episode ${episodeNumber} is not available. The anime has only ${totalEpisodes} episodes. Please, senpai, select a valid episode number. (╥﹏╥)`,
        ephemeral: true
      });
    }

    return totalEpisodes;
  } catch (error) {
    throw new Error(`Goodness gracious, an error occurred while fetching anime info: ${error.message} (◕‿◕✿)`);
  }
}

async function sendLinks(animeId, interaction, episodeNumber, lucy) {
  try {
    const totalEpisodes = await checkEpisodeAvailability(animeId, episodeNumber, interaction, lucy);

    // If the episode is not available, notify the user and return
    if (episodeNumber > totalEpisodes) {
      await interaction.editReply({
        content: `Alas, episode ${episodeNumber} is not available. The anime has only ${totalEpisodes} episodes. Please, senpai, select a valid episode number. (╥﹏╥)`,
        ephemeral: true
      });
      return;
    }

    const watchUrl = `${lucy.config.searchBaseUrl}/watch/${animeId}-episode-${episodeNumber}`;
    const downloadUrl = `${lucy.config.downloadBaseUrl}/download/${animeId}-episode-${episodeNumber}`;

    // Fetch the watch and download data
    const [watchResponse, downloadResponse] = await Promise.all([
      axios.get(watchUrl, { params: { server: 'gogocdn' } }),
      axios.get(downloadUrl)
    ]);

    const watchData = watchResponse.data;
    const downloadData = downloadResponse.data.results;

    const streamingLinks = [];
    const downloadLinks = [];

    // Process streaming links
    for (const source of watchData.sources) {
      const shortenedURL = await shortenURL(source.url);
      streamingLinks.push(`[${source.quality}](${shortenedURL})`);
    }

    // Process download links
    for (const [quality, url] of Object.entries(downloadData)) {
      const shortenedURL = await shortenURL(url);
      downloadLinks.push(`[${quality}](${shortenedURL})`);
    }

    let linksText = '';

    // Add streaming links to the message
    if (streamingLinks.length > 0) {
      linksText += `**Hooray! Streaming Links: ٩(◕‿◕)۶**\n${streamingLinks.join('\n')}\n\n`;
    } else {
      linksText += 'Alas, no streaming links are available. (╥﹏╥)\n\n';
    }

    // Add download links to the message
    if (downloadLinks.length > 0) {
      linksText += `**Hooray! Download Links: ٩(◕‿◕)۶**\n${downloadLinks.join('\n')}`;
    } else {
      linksText += 'Alas, no download links are available. (╥﹏╥)';
    }

    // Create the embed message
    const embed = new EmbedBuilder()
      .setTitle(`Hooray! Episode ${episodeNumber} ٩(◕‿◕)۶`)
      .setDescription(linksText)
      .setColor('#FF69B4'); // Set the color of the embed to a cute pink

    // Send the embed message
    await interaction.channel.send({ embeds: [embed] });
  } catch (error) {
    console.error('Goodness gracious, an error occurred while sending the links: ', error);
    await handleError(interaction, error, lucy);
  }
}

module.exports = {
  handleSearch,
  handleError,
  shortenURL,
  checkEpisodeAvailability,
  sendLinks
};