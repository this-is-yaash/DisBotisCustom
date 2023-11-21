const {EmbedBuilder}=require("discord.js")
const { sendRequestToAdmins } = require('./requestAdminEmbed');

async function handleRoleSelection(interaction, roles, guild) {

    const filter = (interaction) => interaction.customId === 'roleMenu';
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
  
    collector.on('collect', async (interaction) => {
      try {
        const selectedRole = interaction.values[0].split('_')[1];
        const roleName = roles[parseInt(selectedRole)];
        const adminRole = guild.roles.cache.find((role) => role.name === 'Member');

        const requestSentEmbed = await sendRequestToAdmins(interaction ,adminRole, interaction.user.tag, roleName);

        if (requestSentEmbed) {
          await interaction.update({ content: '', embeds: [requestSentEmbed], components: [] }).catch(console.error);
        }

        // Code to send selected roles to admins goes here
      } catch (error) {
        console.error('Failed to process the role selection:', error);
        const errorMessage = 'Failed to select the role. Please try again later.';
        interaction.followUp(errorMessage).catch(console.error);
      }
    });
  }
  
  module.exports = {
    handleRoleSelection,
  };
   