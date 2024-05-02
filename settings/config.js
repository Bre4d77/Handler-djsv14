require('dotenv').config();

module.exports = {
  botToken: process.env.BOT_TOKEN,
  clientId: process.env.CLIENT_ID,
  nodes: [
        {
            host: "localhost",
            port: 2333,
            password: "youshallnotpass",
            secure: false
        }
    ],
  downloadBaseUrl: 'https://api.priyanshu-0w08.workers.dev/',
  searchBaseUrl: 'https://bre4d-api.vercel.app/anime/gogoanime',
  statusMessages: [
    'with Discord.js',
    'with bre4d senpai',
  ],
  statusChangeInterval: 60000, // 2 minutes
};