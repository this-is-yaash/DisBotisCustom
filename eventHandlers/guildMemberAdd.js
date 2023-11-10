const { EmbedBuilder } = require('discord.js');
require('dotenv').config(); // Load environment variables from a .env file

module.exports = {
  execute: (member) => {
    const welcomeEmbed = new EmbedBuilder()
      .setColor('#00ff00')
      .setTitle('Welcome to the Server!')
      .setDescription(`Welcome, ${member.user.tag}, to our server! We're glad to have you.`);

    // Send the embed to a specific channel in your server
    const channel = member.guild.channels.cache.get(process.env.WELCOME);
    if (channel) {
      channel.send({ embeds: [welcomeEmbed] });
      console.log('guildMemberAdd event triggered. Member');
    }
  },
};
