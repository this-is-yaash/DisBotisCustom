const { SlashCommandBuilder } = require('discord.js')
const { helpEmbed } = require('./embed/helpEmbed')
const { Client, GatewayIntentBits } = require('discord.js')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
})

client.once('ready', () => {
  console.log('Bot is ready!')
})

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows available commands for access'),

  async execute (interaction) {
    console.info('/help command has been executed')
    await helpEmbed(interaction, client)
  }
}
