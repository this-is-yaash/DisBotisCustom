const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Provides information about the server.'),
  async execute(interaction) {
    // Retrieve server information
    const guild = interaction.guild;

    // Create an embed using EmbedBuilder to display the server info
    const serverInfoEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Server Information')
    // .setDescription('Some description here')
    .setThumbnail(interaction.guild.iconURL())
    .addFields(
        { name: 'Server Name', value: guild.name, inline: true },
        { name: 'Server ID', value: guild.id.toString(), inline: true },
        { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
        { name: 'Total Members', value: guild.memberCount.toString(), inline: true },
        { name: 'Creation Date', value: new Date(guild.createdTimestamp).toDateString(), inline: true }
    )
    .setTimestamp()
    .setFooter({ text: 'Server Information Command', iconURL: interaction.user.displayAvatarURL() });

    // Send the embed as a response
    await interaction.reply({ embeds: [serverInfoEmbed], ephemeral : true });
  },
};
