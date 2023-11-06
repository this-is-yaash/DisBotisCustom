# DisBotisCustom
A lightweight discord bot with customized features.

#### Readme for setting up the bot application.

## Invite Bot

Invite the bot to your server by creating a link in [Discord Developer Portal](https://discord.com/developers/applications)

- Click OAuth2 dropdown menu > URL Generator.
- Checkout `bot` in Scopes.
- Checkout `Administrator` in bot permissions.
- Scroll down and **Copy** the link in Generated URL & invite the bot to your *Server*.

## Run Bot Application
Paste this code in `prime.js`
```
require('dotenv').config(); // Load environment variables from a .env file
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.GuildVoiceStates,
      IntentsBitField.Flags.MessageContent,
    ],
  });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.BOT_TOKEN); // Token keys are stored in .env file
```
Run this command in terminal
```
node prime.js
```
with this above code, the bot application should run just fine.
> this will basically run the bot in server, it doesn't have any funcitons implemented in it **yet**!.

Note : Make sure to create `.env` file and add the Token keys and other credentials in it.