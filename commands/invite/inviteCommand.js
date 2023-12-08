const { SlashCommandBuilder } = require('discord.js');
const inviteEmbed = require('./inviteMisc/inviteEmbed');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Send Invite for specified users'),

    async execute(interaction, client) {
        console.log("/invite command has been executed");
        await inviteEmbed.inviteCommandEmbed(interaction, client); // Pass 'client' to inviteCommandEmbed
    }
};
