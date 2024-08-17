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
        },
    statusMessages: [
    'with Discord.js',
    'with bre4d senpai',
  ],
  statusChangeInterval: 60000, // 2 minutes
};
