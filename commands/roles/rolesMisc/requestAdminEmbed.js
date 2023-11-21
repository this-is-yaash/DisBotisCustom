const { EmbedBuilder } = require('discord.js');

async function sendRequestToAdmins(adminRole, userTag, roleName) {
  try {
    if (adminRole) {
      const adminMembers = adminRole.members;
      for (const admin of adminMembers) {
        await admin.send(`User ${userTag} requested role: ${roleName}`);
      }

      const requestSentEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Role Request Sent')
        .setDescription(`Your request for the role **${roleName}** has been sent to the admins.`);

      return requestSentEmbed;
    }
  } catch (error) {
    console.error('Failed to send role request to admins:', error);
    return null;
  }
}

module.exports = {
  sendRequestToAdmins,
};
