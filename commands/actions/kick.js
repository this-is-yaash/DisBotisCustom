const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const access = require('./access'); // Adjust the path based on your project structure
module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user from the server.')
    .addUserOption(option => 
        option.setName('user')
        .setDescription('The user to kick')
        .setRequired(true)),
  async execute(interaction) {
    const requiredRole = 'Your Role Name'; // Replace with the name of the role you want to check

    // Check permissions
    if (!(await access.checkPermission(interaction, requiredRole))) {
      return;
    }    const user = interaction.options.getUser('user');

    if (user) {
      const member = interaction.guild.members.cache.get(user.id);

      if (!member) {
        await interaction.reply('User not found in the server.');
        return;
      }

      if (member.kickable) {
        try {
          await member.kick();
          await interaction.reply(`${user.tag} has been kicked from the server.`);
        } catch (error) {
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
