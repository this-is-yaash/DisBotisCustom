const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const access = require('./actionsMisc/accessEmbed'); // Adjust the path based on your project structure

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user from the server.')
    .addUserOption(option => 
        option.setName('user')
        .setDescription('The user to ban')
        .setRequired(true)),
  async execute(interaction) {
    const requiredRole = 'Admin'; // Replace with the name of the role you want to check

    // Check permissions
    if (!(await access.checkPermission(interaction, requiredRole))) {
      return;
    }
    const user = interaction.options.getUser('user');

    if (user) {
      const member = interaction.guild.members.cache.get(user.id);

      if (!member) {
        await interaction.reply('User not found in the server.');
        return;
      }

      if (member.bannable) {
        try {
          await member.ban();
          // Create an embed for the kick response
          const banEmbed = new EmbedBuilder()
            .setTitle("Banned")
            .setDescription(`${user.tag} has been banned ${interaction.guild.name}`)
            .setColor('#ff0000'); // Adjust the color as needed
          await interaction.reply({ embeds: [banEmbed] });
        } catch (error) {
          console.error(`Error banning user: ${error}`);
          await interaction.reply('There was an error while banning the user.');
        }
      } else {
        await interaction.reply('I do not have permission to ban this user.');
      }
    } else {
      await interaction.reply('Please specify a valid user to ban.');
    }
  },
};
