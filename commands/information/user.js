const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides information about the user.'),
  async execute(interaction) {
    // Retrieve user information
    const user = interaction.user;

    // Get the GuildMember object if available (for joinedAt)
    const guildMember = interaction.member;
    const joinDate = guildMember ? guildMember.joinedAt : 'Not in a server';
    
    // Create an embed using EmbedBuilder to display the user info
    const userInfoEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('User Information')
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        { name: 'Username', value: user.username, inline: true },
        { name: 'User ID', value: user.id, inline: true },
        { name: 'Tag', value: user.tag, inline: true },
        { name: 'Discord Member Since', value: user.createdAt.toDateString(), inline: true },
        { name: 'Server Member Since', value: joinDate.toDateString(), inline: true }
    )
      .setTimestamp()
      .setFooter({ text: 'User Information Command', iconURL: interaction.user.displayAvatarURL() });

    // Send the embed as a response with ephemeral set to true
    await interaction.reply({ embeds: [userInfoEmbed], ephemeral: true });
  },
};
