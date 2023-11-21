const { EmbedBuilder } = require('discord.js');

async function sendRequestToAdmins(interaction) {
    const guild = interaction.guild;
    const role = guild.roles.cache.find((role) => role.name === 'Admin'); // Change 'Member' to your role name
  
    if (!role) {
      console.error('Role not found.');
      return;
    }
  
    const membersWithRole = role.members;
  
    membersWithRole.forEach(async (member) => {
      try {
        await member.send('Your message here');
      } catch (error) {
        console.error(`Failed to send message to ${member.user.tag}:`, error);
      }
    });
  }
  
  module.exports = {
    sendRequestToAdmins,
  };
  