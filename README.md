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

client.login(process.env.BOT_TOKEN); // Replace BOT_TOKEN with your bot's token

```
with this above code, the bot application should run just fine.
> this will basically run the bot in server, it doesn't have any funcitons implemented in it **yet**!.