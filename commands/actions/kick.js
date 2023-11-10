const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const access = require('./actionsMisc/accessEmbed'); // Adjust the path based on your project structure

// Array to store kicked user information
const kickedUsers = [];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user from the server.')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('The user to kick')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for kicking')
        .setRequired(true)
        .addChoices(
          { name: 'Violating rules', value: 'violating_rules' },
          { name: 'Spamming', value: 'spamming' },
          { name: 'Inappropriate behavior', value: 'inappropriate_behavior' })
    ),
  async execute(interaction) {

  const requiredRole = 'Admin'; // Replace with the name of the role you want to check
    // Check permissions
    if (!(await access.checkPermission(interaction, requiredRole))) {
      return;
    }
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');

    if (user) {
      const member = interaction.guild.members.cache.get(user.id);

      if (!member) {
        await interaction.reply('User not found in the server.');
        return;
      }

      if (member.kickable) {
        try {
          await member.kick();
          // Create an embed for the kick response
          const kickEmbed = new EmbedBuilder()
            .setTitle("Kicked")
            .setDescription(`${user.tag} has been kicked out of ${interaction.guild.name} for ${reason}`)
            .setColor('#ff0000'); // Adjust the color as needed
          await interaction.reply({ embeds: [kickEmbed] });
        }  catch (error) {
          console.error(`Error kicking user: ${error}`);
          await interaction.reply('There was an error while kicking the user.');
        }
      } else {
        await interaction.reply('I do not have permission to kick this user.');
      }
    } else {
      await interaction.reply('Please specify a valid user to kick.');
    }
  },
};
