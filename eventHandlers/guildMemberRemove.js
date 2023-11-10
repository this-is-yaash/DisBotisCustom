const { EmbedBuilder } = require('discord.js');
require('dotenv').config(); // Load environment variables from a .env file

module.exports = {
  execute: (member) => {
    const goodbyeEmbed = new EmbedBuilder()
      .setColor('#ff0000')
      .setTitle('Goodbye!')
      .setDescription(`Goodbye, ${member.user.tag}. We'll miss you.`);

    // Send the embed to a specific channel in your server
const channel = member.guild.channels.cache.get(process.env.GOODBYE);
    if (channel) {
      channel.send({ embeds: [goodbyeEmbed] });
      console.log('guildMemberRemove event triggered. Member:');
    }
  },
};
