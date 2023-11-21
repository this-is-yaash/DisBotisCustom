const {EmbedBuilder}=require("discord.js")

async function handleRoleSelection(interaction, roles, guild) {

    const filter = (interaction) => interaction.customId === 'roleMenu';
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
  
    collector.on('collect', async (interaction) => {
      try {
        const selectedRole = interaction.values[0].split('_')[1];
        const roleName = roles[parseInt(selectedRole)];
        const adminRole = guild.roles.cache.find((role) => role.name === 'Admin');

        if (adminRole) {
          const adminMembers = adminRole.members;
          for (const admin of adminMembers) {
            await admin.send(`User ${interaction.user.tag} requested role: ${roleName}`);
          }

          const requestSentEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Role Request Sent')
            .setDescription(`Your request for the role **${roleName}** has been sent to the admins.`);

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
   