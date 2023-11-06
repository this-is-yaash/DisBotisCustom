require('dotenv').config(); // Load environment variables from a .env file
const { Client, IntentsBitField } = require('discord.js');
const { handleCommands } = require("./commands/commandHandler")
const client = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.GuildVoiceStates,
      IntentsBitField.Flags.MessageContent,
    ],
  });

// for handling the commands
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  await handleCommands(interaction, client);
  console.log("Command has been executed")
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.BOT_TOKEN); // Replace BOT_TOKEN with your bot's token
