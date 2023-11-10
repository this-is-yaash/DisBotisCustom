const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user from the server.')
    .addUserOption(option => 
        option.setName('user')
        .setDescription('The user to ban')
        .setRequired(true)),
  async execute(interaction) {
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
          await interaction.reply(`${user.tag} has been banned from the server.`);
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
