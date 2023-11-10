const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// Array to store kicked user information
const kickedUsers = [];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list')
    .setDescription('Show a list of kicked users with reasons.'),
  async execute(interaction) {
    // Check if there are kicked users in the array
    if (kickedUsers.length === 0) {
      await interaction.reply('No users have been kicked yet.');
      return;
    }

    // Create an embed to display the list of kicked users
    const kickListEmbed = new EmbedBuilder()
      .setTitle('Kicked Users List')
      .setColor('#ff0000');

    // Iterate through the kickedUsers array and add each user and reason to the embed
    kickedUsers.forEach(({ user, reason }) => {
      kickListEmbed.addField(`Kicked User: ${user}`, `Reason: ${reason}`);
    });

    // Send the embed as a response
    await interaction.reply({ embeds: [kickListEmbed] });
  },
};
