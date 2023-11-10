const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const access = require('./accessEmbed'); // Adjust the path based on your project structure
module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Unban a user from the server.')
    .addStringOption(option => 
        option.setName('user_id')
        .setDescription('Enter user ID to unban')
        .setRequired(false))
    .addStringOption(option => 
        option.setName('username')
        .setDescription('Enter username to unban')
        .setRequired(false)),
    
  async execute(interaction) {
    const requiredRole = 'Admin'; // Replace with the name of the role you want to check

    // Check permissions
    if (!(await access.checkPermission(interaction, requiredRole))) {
      return;
    }
    const userToUnbanId = interaction.options.getString('user_id');
    const username = interaction.options.getString('username');

    if (userToUnbanId || username) {
      // Try to unban by user ID if provided
      if (userToUnbanId) {
        try {
          await interaction.guild.bans.remove(userToUnbanId);
          await interaction.reply(`User with ID ${userToUnbanId} has been unbanned from the server.`);
        } catch (error) {
          console.error(`Error unbanning user by ID: ${error}`);
          await interaction.reply('There was an error while unbanning the user by ID.');
        }
      }
      // Try to unban by username if provided
      else if (username) {
        const bans = await interaction.guild.bans.fetch();
        const bannedUser = bans.find(ban => ban.user.username === username);

        if (bannedUser) {
          try {
            await interaction.guild.bans.remove(bannedUser.user.id);
            await interaction.reply(`User with username ${username} has been unbanned from the server.`);
          } catch (error) {
            console.error(`Error unbanning user by username: ${error}`);
            await interaction.reply('There was an error while unbanning the user by username.');
          }
        } else {
          await interaction.reply(`User with username ${username} was not found in the server bans.`);
        }
      }
    } else {
      await interaction.reply('Please specify a valid user ID or username to unban.');
    }
  },
};
