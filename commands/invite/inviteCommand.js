const { SlashCommandBuilder } = require('discord.js')
const { Client, GatewayIntentBits } = require('discord.js')

const { inviteCommandEmbed } = require("./inviteMisc/inviteEmbed")

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
})
module.exports = {
    data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Send Invite for specified users'),

    async execute (interaction) {
        console.log("/invite command has been executed")
        await inviteCommandEmbed(interaction, client)
    }
}