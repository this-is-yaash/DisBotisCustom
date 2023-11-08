const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user from the server.')
    .addUserOption(option => option.setName('target').setDescription('The user to kick')),
  async execute(interaction) {
    const user = interaction.options.getUser('target');

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
