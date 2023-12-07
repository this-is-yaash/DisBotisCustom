const { SlashCommandBuilder } = require('discord.js');
const { inviteCommandEmbed } = require('./inviteMisc/inviteEmbed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Send Invite for specified users'),

    async execute(interaction) {
        console.log("/invite command has been executed");
        // Embed for Invite
        await inviteCommandEmbed(interaction)
    }
}